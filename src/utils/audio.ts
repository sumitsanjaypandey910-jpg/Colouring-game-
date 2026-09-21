// Pure Web Audio API synthesizers for instant, responsive game audio
class SoundController {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play crisp bubble pop on color swatch selection
  playPop() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio playback failsafe
    }
  }

  // Play satisfying chime splash on coloring a section correctly
  playSplash() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const pitches = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const randomPitch = pitches[Math.floor(Math.random() * pitches.length)];

      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc2.type = 'sine';

      osc.frequency.setValueAtTime(randomPitch, now);
      osc.frequency.exponentialRampToValueAtTime(randomPitch * 1.05, now + 0.2);

      osc2.frequency.setValueAtTime(randomPitch * 2, now);
      osc2.frequency.exponentialRampToValueAtTime(randomPitch * 2.02, now + 0.18);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.28);
      osc2.stop(now + 0.28);
    } catch {
      // ignore
    }
  }

  // Gentle soft boop when tapping a locked/completed or restricted element
  playBoop() {
    this.playWrong();
  }

  // Gentle soft boop when tapping the wrong number or non-matching region
  playWrong() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.14);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // ignore
    }
  }

  // Celebratory victory fanfare when the level is completed
  playFanfare() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [
        { f: 523.25, t: 0, d: 0.12 },    // C5
        { f: 659.25, t: 0.13, d: 0.12 }, // E5
        { f: 783.99, t: 0.26, d: 0.14 }, // G5
        { f: 1046.50, t: 0.42, d: 0.4 }, // C6
      ];

      const now = this.ctx.currentTime;
      notes.forEach(({ f, t, d }) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + t);

        gain.gain.setValueAtTime(0.28, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + t);
        osc.stop(now + t + d);
      });
    } catch {
      // ignore
    }
  }

  // General click sound
  playClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundController();
