import { BeadWord, CharmChain } from "./Decor";
import { Chip, Panel } from "./kit";
import { CATEGORIES } from "@/lib/fica/data";
import type { Answer, Draft } from "@/lib/fica/types";

export function Receive({
  draft,
  onAnswer,
  onSound,
}: {
  draft: Draft;
  onAnswer: (a: Answer) => void;
  onSound: (n: "click" | "yes" | "no") => void;
}) {
  const sender = draft.from.trim() || "alguém";
  const hasPicks = CATEGORIES.some((c) => draft.picks[c.id].length > 0);

  return (
    <div className="relative space-y-5">
      <CharmChain className="absolute -left-6 -top-12 hidden h-32 w-16 sm:block" />

      <div className="jewel-card animate-slide-warp overflow-hidden">
        <div
          className="flex items-center gap-3 border-b-[3px] border-[#3A1D7A] px-5 py-3"
          style={{ background: "linear-gradient(120deg,#A6E8FF,#C56BFF)" }}
        >
          <span className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-[#3A1D7A] bg-[#FFF6FB] text-xl">
            💌
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#3A1D7A]/70">
              chegou pra você
            </p>
            <p className="text-lg font-extrabold text-[#3A1D7A]">
              {sender} mandou algo pra {draft.to.trim() || "você"}
            </p>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <p className="whitespace-pre-wrap text-lg font-semibold leading-relaxed text-[#3A1D7A]">
            {draft.message}
          </p>

          {draft.audioUrl && (
            <div className="bezel bg-[#FFF6FB] p-3">
              <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-[#B3005E]">
                🎙️ áudio de {sender}
              </p>
              <audio controls src={draft.audioUrl} className="w-full" />
            </div>
          )}
        </div>
      </div>

      {hasPicks && (
        <Panel title="vocês dois curtem" hint="foi isso que a pessoa marcou">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.flatMap((c) =>
              draft.picks[c.id].map((item) => (
                <Chip key={c.id + item} tint={c.tint}>
                  <span>{c.emoji}</span>
                  {item}
                </Chip>
              )),
            )}
          </div>
        </Panel>
      )}

      <div className="flex flex-col items-center gap-4 pb-14 pt-2">
        <button
          type="button"
          onClick={() => {
            onSound("yes");
            onAnswer("fica");
          }}
          className="press glow-btn relative w-full max-w-md rounded-full border-[4px] border-[#3A1D7A] px-8 py-6 text-3xl font-extrabold uppercase tracking-wide text-[#FFF6FB]"
          style={{
            background: "linear-gradient(150deg,#FFD1F0 0%,#FF3EA5 45%,#C56BFF 100%)",
            textShadow: "0 3px 0 rgba(58,29,122,.7)",
          }}
        >
          <span className="rhinestone-ring pointer-events-none absolute inset-1 rounded-full opacity-60 mix-blend-screen" />
          <span className="relative">fica comigo</span>
          <span className="absolute -right-3 -top-4 animate-twinkle text-2xl">✨</span>
          <span className="absolute -left-3 bottom-0 animate-twinkle text-xl" style={{ animationDelay: "1s" }}>
            💖
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            onSound("no");
            onAnswer("rala");
          }}
          className="press w-full max-w-xs rounded-[20px] border-[3px] border-[#3A1D7A] px-6 py-3 text-base font-extrabold uppercase tracking-wider text-[#3A1D7A]"
          style={{
            background:
              "repeating-linear-gradient(135deg,#E9E4FF 0 10px,#D9D0FF 10px 20px)",
            boxShadow: "0 5px 0 #3A1D7A, inset 0 2px 0 rgba(255,255,255,.8)",
          }}
        >
          rala daqui 🛹
        </button>

        <button
          type="button"
          onClick={() => {
            onSound("click");
            onAnswer("ignora");
          }}
          className="text-sm font-semibold text-[#3A1D7A]/70 underline underline-offset-4 transition hover:text-[#3A1D7A]"
        >
          prefiro não responder agora
        </button>

        <BeadWord text="sem pressão" className="mt-2 opacity-90" />
      </div>
    </div>
  );
}
