class AudioEngine {
  constructor() {
    this.ctx = null;
  }

  _init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  _beep(freq, duration, type = 'sine', vol = 0.3) {
    try {
      this._init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // silently ignore audio errors
    }
  }

  playTrace() {
    this._beep(880, 0.05, 'sine', 0.1);
  }

  playClear(count) {
    const freq = 440 + count * 30;
    this._beep(freq, 0.2, 'triangle', 0.25);
    setTimeout(() => this._beep(freq * 1.5, 0.15, 'triangle', 0.2), 80);
  }

  playFever() {
    [523, 659, 784, 1047].forEach((f, i) => {
      setTimeout(() => this._beep(f, 0.2, 'square', 0.15), i * 80);
    });
  }

  playTimeUp() {
    [400, 350, 300, 250].forEach((f, i) => {
      setTimeout(() => this._beep(f, 0.3, 'sawtooth', 0.2), i * 150);
    });
  }
}

const audioEngine = new AudioEngine();
export default audioEngine;
