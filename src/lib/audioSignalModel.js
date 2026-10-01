export const AUDIO_SIGNAL_SAMPLE_RATE = 8192;
export const AUDIO_SIGNAL_WAVEFORM_SAMPLES = 256;

export const AUDIO_SIGNAL_PRESETS = [
    {
        id: "single-tone",
        label: "Single tone",
        description: "One frequency makes one clear peak in the spectrum.",
        components: [1],
    },
    {
        id: "two-tone",
        label: "Two tones",
        description: "A second tone adds another peak beside the fundamental.",
        components: [1, 1.5],
    },
    {
        id: "harmonics",
        label: "Harmonics",
        description: "Second and third harmonics add peaks above the fundamental.",
        components: [1, 2, 3],
    },
];

const MIN_FREQUENCY_HZ = 128;
const MAX_FREQUENCY_HZ = 640;
const FREQUENCY_STEP_HZ = 32;
const MAX_NOISE_PERCENT = 40;
const MAX_SAMPLE_COUNT = AUDIO_SIGNAL_SAMPLE_RATE * 2;
const SPECTRUM_MAX_FREQUENCY_HZ = 2048;

function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
}

function resolveSettings({ presetId, frequencyHz, noisePercent } = {}) {
    const availablePreset = AUDIO_SIGNAL_PRESETS.some((preset) => preset.id === presetId)
        ? presetId
        : AUDIO_SIGNAL_PRESETS[0].id;
    const numericFrequency = Number(frequencyHz);
    const numericNoise = Number(noisePercent);
    const safeFrequency = clamp(
        Number.isFinite(numericFrequency) ? numericFrequency : 512,
        MIN_FREQUENCY_HZ,
        MAX_FREQUENCY_HZ,
    );
    const safeNoise = clamp(
        Number.isFinite(numericNoise) ? numericNoise : 0,
        0,
        MAX_NOISE_PERCENT,
    );

    return {
        presetId: availablePreset,
        frequencyHz: MIN_FREQUENCY_HZ
            + Math.round((safeFrequency - MIN_FREQUENCY_HZ) / FREQUENCY_STEP_HZ) * FREQUENCY_STEP_HZ,
        noisePercent: Math.round(safeNoise),
    };
}

function createNoiseGenerator() {
    let state = 0x5f3759df;

    return () => {
        state ^= state << 13;
        state ^= state >>> 17;
        state ^= state << 5;
        return ((state >>> 0) / 0xffffffff) * 2 - 1;
    };
}

function getComponents(presetId, frequencyHz) {
    const preset = AUDIO_SIGNAL_PRESETS.find((item) => item.id === presetId) ?? AUDIO_SIGNAL_PRESETS[0];
    return preset.components.map((multiple, index) => ({
        frequencyHz: frequencyHz * multiple,
        amplitude: index === 0 ? 1 : 0.7 / index,
    }));
}

export function generateAudioSignalSamples(settings = {}, sampleCount = AUDIO_SIGNAL_WAVEFORM_SAMPLES) {
    const { presetId, frequencyHz, noisePercent } = resolveSettings(settings);
    const safeCount = clamp(Math.floor(Number(sampleCount) || AUDIO_SIGNAL_WAVEFORM_SAMPLES), 2, MAX_SAMPLE_COUNT);
    const components = getComponents(presetId, frequencyHz);
    const noiseAmount = noisePercent / 100;
    const nextNoise = createNoiseGenerator();
    const samples = new Float64Array(safeCount);
    let peak = 0;

    for (let index = 0; index < safeCount; index += 1) {
        const time = index / AUDIO_SIGNAL_SAMPLE_RATE;
        const tone = components.reduce(
            (sum, component) => sum + Math.sin(2 * Math.PI * component.frequencyHz * time) * component.amplitude,
            0,
        );
        const value = tone + (nextNoise() * noiseAmount);
        samples[index] = value;
        peak = Math.max(peak, Math.abs(value));
    }

    const scale = Math.max(1, peak);
    return Float32Array.from(samples, (value) => value / scale);
}

function calculateSpectrum(samples) {
    const binWidthHz = AUDIO_SIGNAL_SAMPLE_RATE / samples.length;
    const lastBin = Math.min(
        Math.floor(SPECTRUM_MAX_FREQUENCY_HZ / binWidthHz),
        Math.floor(samples.length / 2),
    );
    const windowWeights = Array.from(samples, (_, index) => (
        0.5 - (0.5 * Math.cos((2 * Math.PI * index) / (samples.length - 1)))
    ));
    const windowWeightTotal = windowWeights.reduce((sum, weight) => sum + weight, 0);
    const bins = [];
    let peakMagnitude = 0;

    for (let bin = 1; bin <= lastBin; bin += 1) {
        let real = 0;
        let imaginary = 0;

        for (let index = 0; index < samples.length; index += 1) {
            const angle = (2 * Math.PI * bin * index) / samples.length;
            const weightedSample = samples[index] * windowWeights[index];
            real += weightedSample * Math.cos(angle);
            imaginary -= weightedSample * Math.sin(angle);
        }

        const magnitude = Math.hypot(real, imaginary) / Math.max(1, windowWeightTotal / 2);
        peakMagnitude = Math.max(peakMagnitude, magnitude);
        bins.push({
            frequencyHz: bin * binWidthHz,
            magnitude,
        });
    }

    return bins.map((bin) => ({
        frequencyHz: bin.frequencyHz,
        magnitude: peakMagnitude > 0 ? bin.magnitude / peakMagnitude : 0,
    }));
}

export function createAudioSignalModel(settings = {}) {
    const normalized = resolveSettings(settings);
    const samples = generateAudioSignalSamples(normalized);

    return {
        ...normalized,
        sampleRate: AUDIO_SIGNAL_SAMPLE_RATE,
        durationMs: (samples.length / AUDIO_SIGNAL_SAMPLE_RATE) * 1000,
        samples,
        spectrum: calculateSpectrum(samples),
    };
}
