import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Play, Square } from "lucide-react";

import {
    AUDIO_SIGNAL_PRESETS,
    AUDIO_SIGNAL_SAMPLE_RATE,
    createAudioSignalModel,
    generateAudioSignalSamples,
} from "../lib/audioSignalModel";
import "./AudioSignalExplorer.css";

const AUDIO_DURATION_SECONDS = 0.72;
const MASTER_GAIN = 0.085;

function getWaveformPath(samples) {
    const width = 640;
    const midline = 78;
    const amplitude = 54;

    return samples.reduce((path, sample, index) => {
        const x = (index / (samples.length - 1)) * width;
        const y = midline - (sample * amplitude);
        return `${path}${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
    }, "");
}

export default function AudioSignalExplorer() {
    const controlId = `audio-signal-${useId().replace(/:/g, "")}`;
    const contextRef = useRef(null);
    const mountedRef = useRef(true);
    const playAttemptRef = useRef(false);
    const playbackRef = useRef(null);
    const [presetId, setPresetId] = useState(AUDIO_SIGNAL_PRESETS[0].id);
    const [frequencyHz, setFrequencyHz] = useState(512);
    const [noisePercent, setNoisePercent] = useState(0);
    const [isStarting, setIsStarting] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackStatus, setPlaybackStatus] = useState(
        "No audio plays until you choose Play. No microphone is used.",
    );

    const selectedPreset = AUDIO_SIGNAL_PRESETS.find((preset) => preset.id === presetId)
        ?? AUDIO_SIGNAL_PRESETS[0];
    const model = useMemo(
        () => createAudioSignalModel({ presetId, frequencyHz, noisePercent }),
        [frequencyHz, noisePercent, presetId],
    );
    const waveformPath = useMemo(() => getWaveformPath(model.samples), [model.samples]);

    const stopSample = useCallback(() => {
        const activePlayback = playbackRef.current;
        if (!activePlayback) {
            setIsPlaying(false);
            setPlaybackStatus("No sample is playing. Nothing was recorded.");
            return;
        }

        playbackRef.current = null;
        const currentTime = activePlayback.context.currentTime;
        try {
            activePlayback.gain.gain.cancelScheduledValues(currentTime);
            activePlayback.gain.gain.setValueAtTime(activePlayback.gain.gain.value, currentTime);
            activePlayback.gain.gain.linearRampToValueAtTime(0, currentTime + 0.02);
            activePlayback.source.stop(currentTime + 0.025);
        } catch {
            // A sample can finish just before the stop control is activated.
        }

        setIsPlaying(false);
        setPlaybackStatus("Sample stopped. Nothing was recorded.");
    }, []);

    const playSample = useCallback(async () => {
        if (playAttemptRef.current) {
            return;
        }
        if (playbackRef.current) {
            stopSample();
        }

        playAttemptRef.current = true;
        setIsStarting(true);
        const AudioContextConstructor = window.AudioContext ?? window.webkitAudioContext;
        let source;
        let gain;

        try {
            if (!AudioContextConstructor) {
                setPlaybackStatus("This browser does not support local Web Audio playback.");
                return;
            }

            let context = contextRef.current;
            if (!context || context.state === "closed") {
                context = new AudioContextConstructor();
                contextRef.current = context;
            }
            if (context.state !== "running") {
                await context.resume();
            }
            if (!mountedRef.current) {
                return;
            }
            if (context.state !== "running") {
                setPlaybackStatus("The browser could not start audio. Choose Play to try again.");
                return;
            }

            const samples = generateAudioSignalSamples(
                { presetId, frequencyHz, noisePercent },
                Math.round(AUDIO_SIGNAL_SAMPLE_RATE * AUDIO_DURATION_SECONDS),
            );
            const buffer = context.createBuffer(1, samples.length, AUDIO_SIGNAL_SAMPLE_RATE);
            buffer.copyToChannel(samples, 0);
            source = context.createBufferSource();
            source.buffer = buffer;
            gain = context.createGain();

            const startsAt = context.currentTime + 0.015;
            const endsAt = startsAt + AUDIO_DURATION_SECONDS;
            gain.gain.setValueAtTime(0, startsAt);
            gain.gain.linearRampToValueAtTime(MASTER_GAIN, startsAt + 0.025);
            gain.gain.setValueAtTime(MASTER_GAIN, endsAt - 0.05);
            gain.gain.linearRampToValueAtTime(0, endsAt);
            source.connect(gain);
            gain.connect(context.destination);

            source.onended = () => {
                source.disconnect();
                gain.disconnect();
                if (mountedRef.current && playbackRef.current?.source === source) {
                    playbackRef.current = null;
                    setIsPlaying(false);
                    setPlaybackStatus("Example finished. Nothing was recorded or recognized.");
                }
            };
            playbackRef.current = { context, source, gain };
            source.start(startsAt);
            setIsPlaying(true);
            setPlaybackStatus("Playing a short synthetic example locally. Nothing was recorded or recognized.");
        } catch {
            source?.disconnect();
            gain?.disconnect();
            playbackRef.current = null;
            if (!mountedRef.current) {
                return;
            }
            setIsPlaying(false);
            setPlaybackStatus("The browser could not play this sample. Try again or use the visual controls.");
        } finally {
            playAttemptRef.current = false;
            if (mountedRef.current) {
                setIsStarting(false);
            }
        }
    }, [frequencyHz, noisePercent, presetId, stopSample]);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
            const activePlayback = playbackRef.current;
            playbackRef.current = null;
            if (activePlayback) {
                activePlayback.source.onended = null;
                try {
                    activePlayback.source.stop();
                } catch {
                    // An ended source no longer needs cleanup.
                }
                activePlayback.source.disconnect();
                activePlayback.gain.disconnect();
            }

            const context = contextRef.current;
            contextRef.current = null;
            if (context && context.state !== "closed") {
                void context.close().catch(() => undefined);
            }
        };
    }, []);

    return (
        <section
            className="audio-signal-explorer"
            data-preset={presetId}
            aria-labelledby={`${controlId}-title`}
            aria-describedby={`${controlId}-note`}
        >
            <div className="audio-signal-explorer__header">
                <div>
                    <p className="audio-signal-explorer__eyebrow">Educational signal lab</p>
                    <h3 id={`${controlId}-title`}>See what a sound contains.</h3>
                    <p className="audio-signal-explorer__intro">
                        Change a generated signal, then compare its waveform with the frequency peaks it contains.
                    </p>
                </div>
                <span className="audio-signal-explorer__badge">Synthetic example</span>
            </div>

            <div className="audio-signal-explorer__controls">
                <div className="audio-signal-explorer__control audio-signal-explorer__control--preset">
                    <label htmlFor={`${controlId}-preset`}>Signal sample</label>
                    <select
                        id={`${controlId}-preset`}
                        value={presetId}
                        onChange={(event) => setPresetId(event.target.value)}
                    >
                        {AUDIO_SIGNAL_PRESETS.map((preset) => (
                            <option key={preset.id} value={preset.id}>{preset.label}</option>
                        ))}
                    </select>
                    <p>{selectedPreset.description}</p>
                </div>

                <div className="audio-signal-explorer__control">
                    <label htmlFor={`${controlId}-frequency`}>
                        Fundamental frequency <output htmlFor={`${controlId}-frequency`}>{frequencyHz} Hz</output>
                    </label>
                    <input
                        id={`${controlId}-frequency`}
                        type="range"
                        min="128"
                        max="640"
                        step="32"
                        value={frequencyHz}
                        onChange={(event) => setFrequencyHz(Number(event.target.value))}
                        aria-valuetext={`${frequencyHz} hertz`}
                    />
                    <p>Move the base pitch to shift the first peak.</p>
                </div>

                <div className="audio-signal-explorer__control">
                    <label htmlFor={`${controlId}-noise`}>
                        Added noise <output htmlFor={`${controlId}-noise`}>{noisePercent}%</output>
                    </label>
                    <input
                        id={`${controlId}-noise`}
                        type="range"
                        min="0"
                        max="40"
                        step="1"
                        value={noisePercent}
                        onChange={(event) => setNoisePercent(Number(event.target.value))}
                        aria-valuetext={`${noisePercent} percent noise`}
                    />
                    <p>Add a deterministic noise layer to the sample.</p>
                </div>
            </div>

            <div className="audio-signal-explorer__plots">
                <figure className="audio-signal-explorer__plot">
                    <figcaption>
                        <strong>Waveform</strong>
                        <span>Amplitude over time</span>
                    </figcaption>
                    <svg
                        viewBox="0 0 640 156"
                        role="img"
                        aria-label={`${selectedPreset.label} waveform at ${frequencyHz} hertz with ${noisePercent} percent noise`}
                    >
                        <line className="audio-signal-explorer__grid" x1="0" y1="24" x2="640" y2="24" />
                        <line className="audio-signal-explorer__axis" x1="0" y1="78" x2="640" y2="78" />
                        <line className="audio-signal-explorer__grid" x1="0" y1="132" x2="640" y2="132" />
                        <path className="audio-signal-explorer__waveform" d={waveformPath} />
                    </svg>
                    <div className="audio-signal-explorer__scale" aria-hidden="true">
                        <span>0 ms</span>
                        <span>{model.durationMs.toFixed(1)} ms</span>
                    </div>
                </figure>

                <figure className="audio-signal-explorer__plot">
                    <figcaption>
                        <strong>Frequency spectrum</strong>
                        <span>Relative amplitude</span>
                    </figcaption>
                    <svg
                        viewBox="0 0 640 156"
                        role="img"
                        aria-label={`Illustrative spectrum for ${selectedPreset.label} at ${frequencyHz} hertz with ${noisePercent} percent noise`}
                    >
                        <line className="audio-signal-explorer__grid" x1="0" y1="24" x2="640" y2="24" />
                        <line className="audio-signal-explorer__grid" x1="0" y1="78" x2="640" y2="78" />
                        <line className="audio-signal-explorer__axis" x1="0" y1="132" x2="640" y2="132" />
                        {model.spectrum.map((bin, index) => {
                            const width = 640 / model.spectrum.length;
                            const height = bin.magnitude * 108;
                            return (
                                <rect
                                    className="audio-signal-explorer__spectrum-bar"
                                    key={bin.frequencyHz}
                                    x={(index * width) + 1}
                                    y={132 - height}
                                    width={Math.max(1, width - 2)}
                                    height={height}
                                    rx="1.5"
                                />
                            );
                        })}
                    </svg>
                    <div className="audio-signal-explorer__scale" aria-hidden="true">
                        <span>0 Hz</span>
                        <span>1 kHz</span>
                        <span>2 kHz</span>
                    </div>
                </figure>
            </div>

            <div className="audio-signal-explorer__footer">
                <button
                    className="audio-signal-explorer__play"
                    type="button"
                    disabled={isStarting}
                    aria-busy={isStarting || undefined}
                    onClick={() => (isPlaying ? stopSample() : void playSample())}
                    aria-label={isStarting
                        ? "Starting the synthetic audio example"
                        : isPlaying
                            ? "Stop the synthetic audio example"
                            : "Play the synthetic audio example"}
                >
                    {isPlaying ? <Square size={15} fill="currentColor" aria-hidden="true" /> : <Play size={15} fill="currentColor" aria-hidden="true" />}
                    {isStarting ? "Starting..." : isPlaying ? "Stop sample" : "Play sample"}
                </button>
                <p className="audio-signal-explorer__status" role="status" aria-live="polite" aria-atomic="true">
                    {playbackStatus}
                </p>
            </div>

            <p className="audio-signal-explorer__note" id={`${controlId}-note`}>
                These plots describe a short signal generated in this widget. They are teaching views, not a recording,
                catalog comparison, or recognition result from Audio Recognition. Audio plays only after you select Play.
            </p>
        </section>
    );
}
