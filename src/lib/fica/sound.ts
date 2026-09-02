let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext ?? (window as any).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function blip(freq: number, start: number, dur: number, type: OscillatorType, gain = 0.14) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime + start);
  g.gain.setValueAtTime(0.0001, c.currentTime + start);
  g.gain.exponentialRampToValueAtTime(gain, c.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
  osc.connect(g).connect(c.destination);
  osc.start(c.currentTime + start);
  osc.stop(c.currentTime + start + dur + 0.05);
}

export type SoundName = "click" | "send" | "yes" | "no" | "pop";

export function playSound(name: SoundName, muted: boolean) {
  if (muted) return;
  try {
    switch (name) {
      case "click":
        blip(880, 0, 0.08, "square", 0.06);
        break;
      case "pop":
        blip(660, 0, 0.09, "triangle", 0.08);
        blip(990, 0.05, 0.09, "triangle", 0.05);
        break;
      case "send":
        [523, 659, 784, 1047].forEach((f, i) => blip(f, i * 0.07, 0.16, "triangle", 0.1));
        break;
      case "yes":
        [523, 659, 784, 1047, 1319].forEach((f, i) => blip(f, i * 0.08, 0.28, "sawtooth", 0.09));
        break;
      case "no":
        [440, 370, 294].forEach((f, i) => blip(f, i * 0.11, 0.22, "sine", 0.09));
        break;
    }
  } catch {
    /* áudio é opcional */
  }
}
