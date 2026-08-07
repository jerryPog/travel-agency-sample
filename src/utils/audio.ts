// Web Audio API realistic jet engine turbine sound generator
// Ported from reference: jet-uncover-loading-screen/src/utils/audio.ts

let audioCtx: AudioContext | null = null;

export function playJetSound(durationInSeconds: number = 2.6) {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // 1. White noise buffer for jet engine roar
    const bufferSize = audioCtx.sampleRate * Math.max(durationInSeconds + 0.5, 1.0);
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    // Lowpass filter: deep engine bass rumble that ramps up on takeoff
    const lowpass = audioCtx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(150, now);
    lowpass.frequency.exponentialRampToValueAtTime(1200, now + durationInSeconds * 0.5);
    lowpass.frequency.exponentialRampToValueAtTime(300, now + durationInSeconds);

    // Bandpass filter: turbine high-pitch whine sweeping up as jet passes
    const bandpass = audioCtx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(800, now);
    bandpass.frequency.exponentialRampToValueAtTime(3200, now + durationInSeconds * 0.4);
    bandpass.frequency.exponentialRampToValueAtTime(1100, now + durationInSeconds);
    bandpass.Q.value = 3.0;

    // Gain node: smooth Doppler volume envelope (spool → roar → fade out)
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.01, now);
    gainNode.gain.exponentialRampToValueAtTime(0.45, now + durationInSeconds * 0.45);
    gainNode.gain.linearRampToValueAtTime(0.60, now + durationInSeconds * 0.55);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + durationInSeconds);

    whiteNoise.connect(lowpass);
    whiteNoise.connect(bandpass);
    lowpass.connect(gainNode);
    bandpass.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + durationInSeconds + 0.2);
  } catch (e) {
    console.warn('Audio playback not supported or blocked:', e);
  }
}

export function stopJetSound() {
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
}
