import { useState } from "react";
import { CharmChain } from "./Decor";
import { JewelButton, Panel } from "./kit";

export function LinkScreen({
  url,
  onPreview,
  onEdit,
  onSound,
}: {
  url: string;
  onPreview: () => void;
  onEdit: () => void;
  onSound: (n: "click" | "pop") => void;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative space-y-5">
      <CharmChain className="absolute -right-2 -top-10 hidden h-28 w-14 sm:block" />
      <Panel title="prontinho, o link tá de pé 🔗" hint="é só mandar pra pessoa certa">
        <div
          className="bezel flex flex-wrap items-center justify-between gap-3 bg-[#FFF6FB] px-4 py-3"
          style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,.9), 0 0 26px rgba(255,62,165,.35)" }}
        >
          <code className="break-all text-base font-extrabold text-[#B3005E]">{url}</code>
          <button
            type="button"
            onClick={async () => {
              onSound("pop");
              try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              } catch {
                setCopied(false);
              }
            }}
            className="press rounded-full border-[2.5px] border-[#3A1D7A] bg-[#FFD84D] px-4 py-1.5 text-sm font-extrabold text-[#3A1D7A]"
          >
            {copied ? "copiado ✨" : "copiar"}
          </button>
        </div>

        <p className="mt-4 rounded-2xl border-[2.5px] border-dashed border-[#8B7CFF] bg-[#F3EBFF]/80 px-3 py-2 text-sm font-semibold text-[#4B2E93]">
          🛡️ na versão final o link passa por moderação (texto + áudio) antes de ativar. aqui é só
          uma prévia pra você ver como fica.
        </p>
      </Panel>

      <div className="flex flex-col gap-3 pb-10 sm:flex-row">
        <JewelButton
          className="flex-1 text-lg"
          onClick={() => {
            onSound("click");
            onPreview();
          }}
        >
          ver como chega pra ela/ele 👀
        </JewelButton>
        <button
          type="button"
          onClick={() => {
            onSound("click");
            onEdit();
          }}
          className="press flex-1 rounded-full border-[3px] border-[#3A1D7A] bg-white/80 px-6 py-3 font-extrabold text-[#3A1D7A]"
          style={{ boxShadow: "0 6px 0 rgba(58,29,122,.75)" }}
        >
          voltar e editar
        </button>
      </div>
    </div>
  );
}
