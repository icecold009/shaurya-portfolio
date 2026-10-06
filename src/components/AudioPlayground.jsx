import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

import "./AudioPlayground.css";

const PADS = [
    { id: "low", name: "Low", note: "C4", key: "Q", frequency: 261.63 },
    { id: "lift", name: "Lift", note: "E4", key: "W", frequency: 329.63 },
    { id: "open", name: "Open", note: "G4", key: "E", frequency: 392 },
    { id: "bright", name: "Bright", note: "C5", key: "R", frequency: 523.25 },
];

const PAD_BY_KEY = new Map(PADS.map((pad) => [pad.key.toLowerCase(), pad]));

export default function AudioPlayground() {
    const audioContextRef = useRef(null);
    const voicesRef = useRef(new Set());
    const activeTimersRef = useRef(new Map());
    const mountedRef = useRef(false);
    const [activePads, setActivePads] = useState(() => new Set());
    const [status, setStatus] = useState("Choose a pad to hear a short synthesized note.");

    const clearActiveTimers = useCallback(() => {
        activeTimersRef.current.forEach((timer) => window.clearTimeout(timer));
        activeTimersRef.current.clear();
    }, []);

    const stopVoices = useCallback(() => {
        voicesRef.current.forEach((voice) => {
            try {
                voice.oscillator.stop();
            } catch {
                // A note may have ended just before the reset.
            }
            voice.oscillator.disconnect();
            voice.envelope.disconnect();
        });
        voicesRef.current.clear();
    }, []);

    const playPad = useCallback(async (pad) => {
        const AudioContextConstructor = window.AudioContext ?? window.webkitAudioContext;

        if (!AudioContextConstructor) {
            setStatus("This browser does not support Web Audio playback.");
            return;
        }

        try {
            let context = audioContextRef.current;
            if (!context || context.state === "closed") {
                context = new AudioContextConstructor();
                audioContextRef.current = context;
            }

            if (context.state !== "running") {
                await context.resume();
            }
            if (!mountedRef.current || context.state !== "running") {
                return;
            }

            const oscillator = context.createOscillator();
            const envelope = context.createGain();
            const startsAt = context.currentTime;

            oscillator.type = "triangle";
            oscillator.frequency.setValueAtTime(pad.frequency, startsAt);
            envelope.gain.setValueAtTime(0, startsAt);
            envelope.gain.linearRampToValueAtTime(0.12, startsAt + 0.018);
            envelope.gain.exponentialRampToValueAtTime(0.0008, startsAt + 0.72);
            oscillator.connect(envelope);
            envelope.connect(context.destination);

            const voice = { oscillator, envelope };
            voicesRef.current.add(voice);
            oscillator.onended = () => {
                voicesRef.current.delete(voice);
                oscillator.disconnect();
                envelope.disconnect();
            };
            oscillator.start(startsAt);
            oscillator.stop(startsAt + 0.74);

            const existingTimer = activeTimersRef.current.get(pad.id);
            if (existingTimer) {
                window.clearTimeout(existingTimer);
            }
            setActivePads((current) => new Set(current).add(pad.id));
            const timer = window.setTimeout(() => {
                activeTimersRef.current.delete(pad.id);
                setActivePads((current) => {
                    const next = new Set(current);
                    next.delete(pad.id);
                    return next;
                });
            }, 760);
            activeTimersRef.current.set(pad.id, timer);
            setStatus(`${pad.name} ${pad.note} is playing. Play another pad to layer a note.`);
        } catch {
            if (mountedRef.current) {
                setStatus("The browser could not start audio. Try playing a pad again.");
            }
        }
    }, []);

    const resetPads = useCallback(() => {
        clearActiveTimers();
        stopVoices();
        setActivePads(new Set());
        setStatus("All notes stopped. Choose a pad to play again.");
    }, [clearActiveTimers, stopVoices]);

    useEffect(() => {
        mountedRef.current = true;
        const handleKeyDown = (event) => {
            if (event.defaultPrevented || event.repeat || event.altKey || event.ctrlKey || event.metaKey) {
                return;
            }

            const target = event.target instanceof HTMLElement ? event.target : null;
            if (target?.isContentEditable || target?.closest("input, textarea, select")) {
                return;
            }

            const focusedControl = target?.closest(
                "a[href], button, [role='button'], [role='link'], [role='tab']",
            );
            if (focusedControl && !target?.closest(".audio-playground__pad")) {
                return;
            }

            const pad = PAD_BY_KEY.get(event.key.toLowerCase());
            if (!pad) {
                return;
            }

            event.preventDefault();
            void playPad(pad);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            mountedRef.current = false;
            window.removeEventListener("keydown", handleKeyDown);
            clearActiveTimers();
            stopVoices();
            const context = audioContextRef.current;
            audioContextRef.current = null;
            if (context && context.state !== "closed") {
                void context.close().catch(() => undefined);
            }
        };
    }, [clearActiveTimers, playPad, stopVoices]);

    return (
        <div className="audio-playground" aria-describedby="audio-playground-note">
            <div className="audio-playground__topline">
                <div>
                    <p className="audio-playground__eyebrow">Four synthesized tones</p>
                    <p className="audio-playground__instruction">Play more than one before the notes fade to layer a chord.</p>
                </div>
                <span className="audio-playground__local-label">Runs in this browser</span>
            </div>

            <div className="audio-playground__pads" role="group" aria-label="Four musical note pads">
                {PADS.map((pad) => (
                    <button
                        key={pad.id}
                        type="button"
                        className={`audio-playground__pad${activePads.has(pad.id) ? " audio-playground__pad--active" : ""}`}
                        onClick={() => void playPad(pad)}
                        aria-label={`Play ${pad.name}, ${pad.note}. Keyboard shortcut ${pad.key}.`}
                        aria-keyshortcuts={pad.key}
                    >
                        <span className="audio-playground__pad-key" aria-hidden="true">{pad.key}</span>
                        <span className="audio-playground__pad-name">{pad.name}</span>
                        <span className="audio-playground__pad-note">{pad.note}</span>
                    </button>
                ))}
            </div>

            <div className="audio-playground__footer">
                <p className="audio-playground__status" role="status" aria-live="polite" aria-atomic="true">
                    {status}
                </p>
                <div className="audio-playground__actions">
                    <Link className="home-text-link cta-link audio-playground__story-link" to="/projects?project=touchscreen-launchpad">
                        How this works <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                    <button className="audio-playground__reset" type="button" onClick={resetPads}>
                        <RotateCcw size={15} aria-hidden="true" />
                        Reset sounds
                    </button>
                </div>
            </div>

            <p className="audio-playground__note" id="audio-playground-note">
                This small demo synthesizes tones after you activate a pad. It does not load the full Launchpad or its sample kits.
            </p>
        </div>
    );
}
