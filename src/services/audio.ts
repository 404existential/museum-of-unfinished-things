class AudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
      this.play('chime');
    }
    return this.enabled;
  }

  public play(type: 'click' | 'thud' | 'chime' | 'paper' | 'witness') {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.05);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'thud') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.1);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'chime') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.3); // A5
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'witness') {
        // Warm harmonic cathedral bell / singing bowl chime for witnessing intention
        const osc2 = this.ctx.createOscillator();
        const osc3 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        const gain3 = this.ctx.createGain();

        // Fundamental A4 (440Hz)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

        // Harmonic E5 (659.25Hz)
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(659.25, now);
        gain2.gain.setValueAtTime(0.18, now);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

        // Harmonic A5 (880Hz)
        osc3.type = 'triangle';
        osc3.frequency.setValueAtTime(880, now);
        gain3.gain.setValueAtTime(0.12, now);
        gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

        osc.connect(gain);
        osc2.connect(gain2);
        osc3.connect(gain3);
        gain.connect(this.ctx.destination);
        gain2.connect(this.ctx.destination);
        gain3.connect(this.ctx.destination);

        osc.start(now);
        osc2.start(now);
        osc3.start(now);
        osc.stop(now + 0.9);
        osc2.stop(now + 0.8);
        osc3.stop(now + 0.6);
      } else if (type === 'paper') {
        const bufferSize = this.ctx.sampleRate * 0.07;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1600;
        filter.Q.value = 3;
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(now);
      }
    } catch (e) {
      console.warn('Audio synthesis note:', e);
    }
  }
}

export const sound = new AudioEngine();
