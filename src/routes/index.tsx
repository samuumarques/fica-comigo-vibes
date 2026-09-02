import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Backdrop } from "@/components/fica/Decor";
import { Logo } from "@/components/fica/Logo";
import { Compose } from "@/components/fica/Compose";
import { LinkScreen } from "@/components/fica/LinkScreen";
import { Receive } from "@/components/fica/Receive";
import { Result } from "@/components/fica/Result";
import { playSound, type SoundName } from "@/lib/fica/sound";
import { makeSlug } from "@/lib/fica/data";
import { emptyDraft, type Answer, type Draft } from "@/lib/fica/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ficacomigo — manda a real pra quem você gosta" },
      {
        name: "description",
        content:
          "Monta uma mensagem com texto, áudio e os gostos que vocês têm em comum. A pessoa responde com FICA COMIGO ou RALA DAQUI.",
      },
      { property: "og:title", content: "ficacomigo — manda a real pra quem você gosta" },
      {
        property: "og:description",
        content:
          "Texto, áudio e interesses em comum num link só. A resposta é um clique: FICA COMIGO ou RALA DAQUI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FicaComigo,
});

type Step = 1 | 2 | 3 | 4;

const STEP_LABEL: Record<Step, string> = {
  1: "montando",
  2: "link pronto",
  3: "visão de quem recebe",
  4: "resposta",
};

function FicaComigo() {
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [url, setUrl] = useState("");
  const [answer, setAnswer] = useState<Answer>("fica");
  const [muted, setMuted] = useState(false);

  const sfx = useCallback((n: SoundName) => playSound(n, muted), [muted]);

  return (
    <>
      <Backdrop />
      <main className="mx-auto min-h-screen w-full max-w-2xl px-4 pt-6">
        <header className="mb-6 flex items-start justify-between gap-3">
          <div>
            <Logo size="text-5xl sm:text-6xl" />
            <p className="mt-1 text-sm font-bold text-[#3A1D7A]/85">
              a real, com brilho — feito pra mandar pra uma pessoa só.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setMuted((m) => !m);
              playSound("click", muted);
            }}
            aria-pressed={muted}
            aria-label={muted ? "ativar sons" : "desativar sons"}
            className="press grid h-11 w-11 shrink-0 place-items-center rounded-full border-[3px] border-[#3A1D7A] bg-[#FFF6FB] text-lg"
            style={{ boxShadow: "0 4px 0 #3A1D7A" }}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </header>

        <nav aria-label="progresso" className="mb-5 flex items-center gap-2">
          {([1, 2, 3, 4] as Step[]).map((s) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <span
                className="h-2.5 flex-1 rounded-full border-2 border-[#3A1D7A] transition-all"
                style={{
                  background: s <= step ? "linear-gradient(90deg,#FF3EA5,#C56BFF)" : "#FFFFFF88",
                  boxShadow: s === step ? "0 0 14px rgba(255,62,165,.8)" : undefined,
                }}
              />
            </div>
          ))}
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#3A1D7A]/80">
            {STEP_LABEL[step]}
          </span>
        </nav>

        <div key={step} className="animate-slide-warp">
          {step === 1 && (
            <Compose
              draft={draft}
              setDraft={setDraft}
              onSound={sfx}
              onGenerate={() => {
                setUrl(`ficacomigo.app/p/${makeSlug(draft.to)}`);
                setStep(2);
              }}
            />
          )}

          {step === 2 && (
            <LinkScreen
              url={url}
              onSound={sfx}
              onPreview={() => setStep(3)}
              onEdit={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <Receive
              draft={draft}
              onSound={sfx}
              onAnswer={(a) => {
                setAnswer(a);
                setStep(4);
              }}
            />
          )}

          {step === 4 && (
            <Result
              answer={answer}
              draft={draft}
              onBack={() => setStep(3)}
              onRestart={() => {
                setDraft(emptyDraft);
                setUrl("");
                setStep(1);
                sfx("pop");
              }}
            />
          )}
        </div>
      </main>
    </>
  );
}
