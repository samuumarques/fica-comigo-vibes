import { Confetti } from "./Confetti";
import { BeadWord } from "./Decor";
import { JewelButton } from "./kit";
import type { Answer, Draft } from "@/lib/fica/types";

const COPY: Record<Answer, { emoji: string; title: string; lines: string[] }> = {
  fica: {
    emoji: "💞",
    title: "combinou!",
    lines: [
      "vocês dois estão dentro. avisamos quem mandou na hora.",
      "agora o chat abre pros dois — o resto é com vocês.",
    ],
  },
  rala: {
    emoji: "🛹",
    title: "respondido, sem climão",
    lines: [
      "a pessoa recebe só um aviso curto de que não rolou. sem print, sem detalhe, sem exposição.",
      "e ela fica bloqueada de te mandar outra mensagem por aqui.",
    ],
  },
  ignora: {
    emoji: "🫧",
    title: "ficou por isso mesmo",
    lines: [
      "nada foi enviado. quem mandou não recebe aviso nenhum.",
      "o link continua guardado por 7 dias caso você mude de ideia.",
    ],
  },
};

export function Result({
  answer,
  draft,
  onRestart,
  onBack,
}: {
  answer: Answer;
  draft: Draft;
  onRestart: () => void;
  onBack: () => void;
}) {
  const copy = COPY[answer];
  const sender = draft.from.trim() || "quem mandou";

  return (
    <div className="animate-slide-warp space-y-6 pb-16 text-center">
      <Confetti fire={answer === "fica"} />

      <div className="text-7xl" style={{ animation: "wobble 2.4s ease-in-out infinite" }}>
        {copy.emoji}
      </div>

      <h2
        className="logo-bubble text-5xl sm:text-6xl"
        style={{ WebkitTextStroke: "3px #3A1D7A" }}
      >
        {copy.title}
      </h2>

      <div className="jewel-card mx-auto max-w-lg space-y-3 p-6 text-left">
        {copy.lines.map((l) => (
          <p key={l} className="text-base font-semibold text-[#3A1D7A]">
            {l}
          </p>
        ))}
        {answer === "fica" && (
          <p className="text-sm font-bold text-[#B3005E]">
            {sender} já tá vendo isso aparecer na tela dele(a) agora 👀
          </p>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <JewelButton onClick={onRestart} tone="pink">
          criar outro ficacomigo
        </JewelButton>
        <button
          type="button"
          onClick={onBack}
          className="press rounded-full border-[3px] border-[#3A1D7A] bg-white/80 px-6 py-3 font-extrabold text-[#3A1D7A]"
          style={{ boxShadow: "0 6px 0 rgba(58,29,122,.75)" }}
        >
          voltar pra mensagem
        </button>
      </div>

      <div className="flex justify-center">
        <BeadWord text="ficacomigo" />
      </div>
    </div>
  );
}
