import test from "node:test";
import assert from "node:assert/strict";

import {
    AUDIO_SIGNAL_SAMPLE_RATE,
    AUDIO_SIGNAL_WAVEFORM_SAMPLES,
    createAudioSignalModel,
    generateAudioSignalSamples,
} from "../src/lib/audioSignalModel.js";

function findPeakNear(spectrum, targetHz, toleranceHz = 48) {
    return spectrum
        .filter((bin) => Math.abs(bin.frequencyHz - targetHz) <= toleranceHz)
        .reduce((peak, bin) => (bin.magnitude > peak.magnitude ? bin : peak), { magnitude: 0 });
}

test("builds a bounded deterministic synthetic signal and a normalized spectrum", () => {
    const first = createAudioSignalModel({ presetId: "single-tone", frequencyHz: 512, noisePercent: 0 });
    const second = createAudioSignalModel({ presetId: "single-tone", frequencyHz: 512, noisePercent: 0 });

    assert.equal(first.sampleRate, AUDIO_SIGNAL_SAMPLE_RATE);
    assert.equal(first.samples.length, AUDIO_SIGNAL_WAVEFORM_SAMPLES);
    assert.deepEqual(first.samples, second.samples);
    assert.ok(Array.from(first.samples).every((sample) => Number.isFinite(sample) && Math.abs(sample) <= 1));
    assert.ok(first.spectrum.every((bin) => bin.magnitude >= 0 && bin.magnitude <= 1));
    assert.equal(findPeakNear(first.spectrum, 512).frequencyHz, 512);
});

test("frequency and selected preset move the generated waveform and spectral peaks", () => {
    const lower = createAudioSignalModel({ presetId: "single-tone", frequencyHz: 256, noisePercent: 0 });
    const higher = createAudioSignalModel({ presetId: "single-tone", frequencyHz: 512, noisePercent: 0 });
    const twoTone = createAudioSignalModel({ presetId: "two-tone", frequencyHz: 512, noisePercent: 0 });

    assert.notDeepEqual(lower.samples, higher.samples);
    assert.equal(findPeakNear(lower.spectrum, 256).frequencyHz, 256);
    assert.equal(findPeakNear(higher.spectrum, 512).frequencyHz, 512);
    assert.ok(findPeakNear(twoTone.spectrum, 512).magnitude > 0.7);
    assert.ok(findPeakNear(twoTone.spectrum, 768).magnitude > 0.7);
});

test("noise changes the same sample used by both the waveform and spectrum", () => {
    const clean = createAudioSignalModel({ presetId: "single-tone", frequencyHz: 512, noisePercent: 0 });
    const noisy = createAudioSignalModel({ presetId: "single-tone", frequencyHz: 512, noisePercent: 35 });
    const cleanHighBand = clean.spectrum.filter((bin) => bin.frequencyHz >= 1200);
    const noisyHighBand = noisy.spectrum.filter((bin) => bin.frequencyHz >= 1200);
    const average = (bins) => bins.reduce((sum, bin) => sum + bin.magnitude, 0) / bins.length;

    assert.notDeepEqual(clean.samples, noisy.samples);
    assert.ok(average(noisyHighBand) > average(cleanHighBand) + 0.015);
});

test("sample generation bounds requested size and clamps unsafe settings", () => {
    const samples = generateAudioSignalSamples(
        { presetId: "unknown", frequencyHz: 5000, noisePercent: 200 },
        AUDIO_SIGNAL_SAMPLE_RATE * 10,
    );

    assert.equal(samples.length, AUDIO_SIGNAL_SAMPLE_RATE * 2);
    assert.ok(Array.from(samples).every((sample) => Math.abs(sample) <= 1));
});
