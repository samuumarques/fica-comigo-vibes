import { useMemo, useState } from "react";
import { AudioRecorder } from "./AudioRecorder";
import { Chip, JewelButton, Panel } from "./kit";
import { CATALOG, CATEGORIES, MAX_PER_CATEGORY, findBadWords, type CategoryId } from "@/lib/fica/data";
import type { Draft } from "@/lib/fica/types";

export function Compose({
  draft,
  setDraft,
  onGenerate,
  onSound,
}: {
  draft: Draft;
  setDraft: (d: Draft) => void;
  onGenerate: () => void;
  onSound: (n: "click" | "pop" | "send") => void;
}) {
  const [openCat, setOpenCat] = useState<CategoryId | null>(null);
  const [search, setSearch] = useState("");

  const bad = useMemo(() => findBadWords(draft.message), [draft.message]);
  const totalPicks = Object.values(draft.picks).reduce((a, b) => a + b.length, 0);
  const canGenerate =
    draft.to.trim().length > 1 && draft.message.trim().length > 4 && bad.length === 0;

  const list = openCat
    ? CATALOG[openCat].filter((i) => i.toLowerCase().includes(search.toLowerCase()))
    : [];

  function toggleItem(cat: CategoryId, item: string) {
    const cur = draft.picks[cat];
    const has = cur.includes(item);
    if (!has && cur.length >= MAX_PER_CATEGORY) return;
    onSound("pop");
    setDraft({
      ...draft,
      picks: { ...draft.picks, [cat]: has ? cur.filter((i) => i !== item) : [...cur, item] },
    });
  }

  return (
    <div className="space-y-5">
      <Panel title="pra quem é?" hint="escreve o nome (ou o apelido) de quem vai receber">
        <input
          value={draft.to}
          onChange={(e) => setDraft({ ...draft, to: e.target.value })}
          placeholder="ex: Bia da aula de cálculo"
          maxLength={40}
          className="bezel w-full bg-[#FFF6FB] px-4 py-3 text-lg font-semibold text-[#3A1D7A] outline-none transition focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,62,165,.35)] placeholder:text-[#B79BE0]"
        />
        <div className="mt-3">
          <input
            value={draft.from}
            onChange={(e) => setDraft({ ...draft, from: e.target.value })}
            placeholder="e você, quem é? (seu nome)"
            maxLength={40}
            className="bezel w-full bg-[#FFF6FB] px-4 py-3 font-semibold text-[#3A1D7A] outline-none transition focus:bg-white focus:shadow-[0_0_0_4px_rgba(197,107,255,.35)] placeholder:text-[#B79BE0]"
          />
        </div>
      </Panel>

      <Panel title="a mensagem" hint="sem enrolação, do jeito que você falaria">
        <textarea
          value={draft.message}
          onChange={(e) => setDraft({ ...draft, message: e.target.value })}
          rows={5}
          maxLength={600}
          placeholder="oi… eu tava pensando aqui…"
          className={`bezel w-full resize-none bg-[#FFF6FB] px-4 py-3 font-semibold text-[#3A1D7A] outline-none transition placeholder:text-[#B79BE0] focus:bg-white ${
            bad.length ? "border-[#FF3EA5] shadow-[0_0_0_4px_rgba(255,62,165,.3)]" : "focus:shadow-[0_0_0_4px_rgba(255,62,165,.3)]"
          }`}
        />
        <div className="mt-2 flex items-center justify-between text-xs font-bold text-[#6C4BB0]">
          <span>{draft.message.length}/600</span>
          {bad.length === 0 && draft.message.length > 4 && <span>tá limpo ✨</span>}
        </div>
        {bad.length > 0 && (
          <p className="animate-pop-in mt-2 rounded-2xl border-[2.5px] border-[#FF3EA5] bg-[#FFE6F4] px-3 py-2 text-sm font-bold text-[#B3005E]">
            eita 😬 detectamos {bad.length === 1 ? "uma palavra" : "palavras"} que não rola aqui (
            {bad.map((b) => b[0] + "•".repeat(Math.max(b.length - 1, 1))).join(", ")}). ajusta o
            texto pra liberar o envio.
          </p>
        )}
      </Panel>

      <Panel title="quer mandar a voz?" hint="áudio bate diferente de texto">
        <AudioRecorder
          audioUrl={draft.audioUrl}
          onChange={(url) => setDraft({ ...draft, audioUrl: url })}
          onSound={() => onSound("click")}
        />
      </Panel>

      <Panel
        title="o que vocês têm em comum"
        hint={`escolhe até ${MAX_PER_CATEGORY} por categoria — ${totalPicks} selecionado${totalPicks === 1 ? "" : "s"}`}
      >
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = openCat === c.id;
            const count = draft.picks[c.id].length;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onSound("click");
                  setSearch("");
                  setOpenCat(active ? null : c.id);
                }}
                className="press relative rounded-[18px] border-[3px] border-[#3A1D7A] px-4 py-2 text-sm font-extrabold text-[#FFF6FB]"
                style={{
                  background: active
                    ? `linear-gradient(150deg,#FFF6FB 0%, ${c.tint} 70%)`
                    : `linear-gradient(150deg, ${c.tint} 0%, #8B7CFF 130%)`,
                  boxShadow: active
                    ? `0 3px 0 #3A1D7A, 0 0 22px ${c.tint}aa`
                    : "0 6px 0 #3A1D7A, inset 0 2px 0 rgba(255,255,255,.6)",
                  transform: active ? "translateY(3px)" : undefined,
                }}
              >
                <span className="mr-1">{c.emoji}</span>
                {c.label}
                {count > 0 && (
                  <span className="ml-2 rounded-full border-2 border-[#3A1D7A] bg-[#FFD84D] px-1.5 text-[11px] text-[#3A1D7A]">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {openCat && (
          <div className="animate-slide-warp bezel mt-4 bg-[#FFF6FB]/95 p-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="buscar…"
              className="mb-3 w-full rounded-full border-[2.5px] border-[#8B7CFF] bg-white px-4 py-2 font-semibold text-[#3A1D7A] outline-none focus:border-[#FF3EA5] placeholder:text-[#B79BE0]"
            />
            <ul className="max-h-56 space-y-1 overflow-y-auto pr-1">
              {list.map((item) => {
                const sel = draft.picks[openCat].includes(item);
                const full = draft.picks[openCat].length >= MAX_PER_CATEGORY && !sel;
                return (
                  <li key={item}>
                    <button
                      type="button"
                      disabled={full}
                      onClick={() => toggleItem(openCat, item)}
                      className={`press flex w-full items-center justify-between rounded-2xl border-[2.5px] px-3 py-2 text-left text-sm font-bold ${
                        sel
                          ? "border-[#3A1D7A] bg-[#FF3EA5] text-[#FFF6FB]"
                          : "border-[#C9B6F5] bg-white text-[#3A1D7A] disabled:opacity-40"
                      }`}
                    >
                      {item}
                      <span>{sel ? "✓" : "+"}</span>
                    </button>
                  </li>
                );
              })}
              {list.length === 0 && (
                <li className="px-2 py-3 text-sm font-bold text-[#6C4BB0]">
                  nada com esse nome por aqui 🫧
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.flatMap((c) =>
            draft.picks[c.id].map((item) => (
              <Chip
                key={c.id + item}
                tint={c.tint}
                onRemove={() => toggleItem(c.id, item)}
              >
                <span>{c.emoji}</span>
                {item}
              </Chip>
            )),
          )}
        </div>
      </Panel>

      <div className="flex flex-col items-center gap-2 pb-10">
        <JewelButton
          disabled={!canGenerate}
          onClick={() => {
            onSound("send");
            onGenerate();
          }}
          className="w-full max-w-sm text-lg"
        >
          gerar o link 💌
        </JewelButton>
        {!canGenerate && (
          <p className="text-sm font-bold text-[#3A1D7A]/80">
            falta preencher nome e mensagem (sem palavrão 😉)
          </p>
        )}
      </div>
    </div>
  );
}
