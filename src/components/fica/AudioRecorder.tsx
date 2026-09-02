import { useEffect, useRef, useState } from "react";

export function AudioRecorder({
  audioUrl,
  onChange,
  onSound,
}: {
  audioUrl: string | null;
  onChange: (url: string | null) => void;
  onSound: () => void;
}) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<BlobPart[]>([]);

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  async function start() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunks.current = [];
      rec.ondataavailable = (e) => chunks.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunks.current, { type: rec.mimeType || "audio/webm" });
        onChange(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start();
      recRef.current = rec;
      setSeconds(0);
      setRecording(true);
      onSound();
    } catch {
      setError("Não rolou acessar o microfone. Libera a permissão no navegador 🎤");
    }
  }

  function stop() {
    recRef.current?.stop();
    recRef.current = null;
    setRecording(false);
    onSound();
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={recording ? stop : start}
          aria-label={recording ? "parar gravação" : "gravar áudio"}
          className="press relative grid h-16 w-16 place-items-center rounded-full border-[3px] border-[#3A1D7A]"
          style={{
            background: recording
              ? "linear-gradient(150deg,#FFD84D,#FF3EA5)"
              : "linear-gradient(150deg,#FFFFFF,#FF9EDE 55%,#C56BFF)",
            boxShadow: recording
              ? "0 0 0 6px rgba(255,62,165,.25), 0 6px 0 #3A1D7A"
              : "0 6px 0 #3A1D7A, inset 0 2px 0 rgba(255,255,255,.8)",
          }}
        >
          <span className="text-2xl">{recording ? "■" : "🎙️"}</span>
          {recording && (
            <span className="absolute -inset-2 animate-ping rounded-full border-2 border-[#FF3EA5]" />
          )}
        </button>
        <div>
          <p className="font-extrabold text-[#3A1D7A]">
            {recording ? `gravando… ${seconds}s` : audioUrl ? "áudio gravado 💿" : "manda um áudio"}
          </p>
          <p className="text-xs text-[#6C4BB0]">
            até uns 60s — fala o que não cabe no texto
          </p>
        </div>
        {audioUrl && !recording && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="press rounded-full border-[2.5px] border-[#3A1D7A] bg-white/70 px-3 py-1 text-sm font-bold text-[#3A1D7A]"
          >
            regravar
          </button>
        )}
      </div>

      {audioUrl && (
        <div className="bezel animate-pop-in bg-[#FFF6FB] p-3">
          <audio controls src={audioUrl} className="w-full" />
        </div>
      )}

      <p className="rounded-2xl border-[2.5px] border-dashed border-[#8B7CFF] bg-[#F3EBFF]/80 px-3 py-2 text-xs font-semibold text-[#4B2E93]">
        ⚠️ todo áudio passa por revisão de conteúdo antes de ficar disponível pra outra pessoa.
      </p>

      {error && (
        <p className="rounded-2xl border-[2.5px] border-[#FF3EA5] bg-[#FFE6F4] px-3 py-2 text-xs font-bold text-[#B3005E]">
          {error}
        </p>
      )}
    </div>
  );
}
