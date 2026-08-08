// Realistic jet engine Doppler flyby sound — Web Audio API synthesis
// Singleton AudioContext pattern for optimal performance & resource efficiency

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;

  if (!audioCtx || audioCtx.state === 'closed') {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    audioCtx = new AudioContextClass();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {
      // Autoplay blocked by browser policy until user gesture
    });
  }

  return audioCtx;
}

export function playJetSound(durationInSeconds: number = 2.6) {
  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state === 'suspended') return;

    const now = ctx.currentTime;

    // ── 1. White noise buffer (jet roar source) ──────────────────────
    const bufferSize = ctx.sampleRate * (durationInSeconds + 0.5);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    // ── 2. Low-pass filter → deep engine bass rumble ─────────────────
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(120, now);
    lowpass.frequency.exponentialRampToValueAtTime(1400, now + durationInSeconds * 0.45);
    lowpass.frequency.exponentialRampToValueAtTime(280, now + durationInSeconds);

    // ── 3. Band-pass filter → turbine high-pitch whine ───────────────
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(700, now);
    bandpass.frequency.exponentialRampToValueAtTime(3600, now + durationInSeconds * 0.4);
    bandpass.frequency.exponentialRampToValueAtTime(900, now + durationInSeconds);
    bandpass.Q.value = 4.0;

    // ── 4. High-pass filter → adds crispy high-freq air rush ─────────
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(4000, now);
    highpass.frequency.exponentialRampToValueAtTime(8000, now + durationInSeconds * 0.5);
    highpass.frequency.exponentialRampToValueAtTime(3000, now + durationInSeconds);

    const highpassGain = ctx.createGain();
    highpassGain.gain.setValueAtTime(0.08, now);

    // ── 5. Sub-bass oscillator → physical engine vibration ───────────
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(48, now);
    subOsc.frequency.linearRampToValueAtTime(72, now + durationInSeconds * 0.5);
    subOsc.frequency.linearRampToValueAtTime(38, now + durationInSeconds);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.0, now);
    subGain.gain.linearRampToValueAtTime(0.12, now + durationInSeconds * 0.2);
    subGain.gain.linearRampToValueAtTime(0.18, now + durationInSeconds * 0.5);
    subGain.gain.linearRampToValueAtTime(0.0, now + durationInSeconds);

    // ── 6. Master gain → Doppler volume envelope ─────────────────────
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.001, now);
    master.gain.exponentialRampToValueAtTime(0.55, now + durationInSeconds * 0.42);
    master.gain.linearRampToValueAtTime(0.70, now + durationInSeconds * 0.52);
    master.gain.exponentialRampToValueAtTime(0.001, now + durationInSeconds);

    // ── Wire up graph ─────────────────────────────────────────────────
    noise.connect(lowpass);
    noise.connect(bandpass);
    noise.connect(highpass);
    highpass.connect(highpassGain);
    lowpass.connect(master);
    bandpass.connect(master);
    highpassGain.connect(master);
    subOsc.connect(subGain);
    subGain.connect(master);
    master.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + durationInSeconds + 0.3);
    subOsc.start(now);
    subOsc.stop(now + durationInSeconds + 0.3);
  } catch (e) {
    console.warn('Jet audio sound prevented or not supported:', e);
  }
}
