import type { ButtonHTMLAttributes, ReactNode } from "react";

export function JewelButton({
  children,
  tone = "pink",
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: "pink" | "violet" | "ice" }) {
  const bg =
    tone === "pink"
      ? "linear-gradient(150deg,#FF7BD5 0%,#FF3EA5 55%,#C56BFF 100%)"
      : tone === "violet"
        ? "linear-gradient(150deg,#C56BFF 0%,#8B7CFF 60%,#5B6BFF 100%)"
        : "linear-gradient(150deg,#FFFFFF 0%,#A6E8FF 60%,#8B7CFF 100%)";
  return (
    <button
      {...rest}
      className={`press relative rounded-full border-[3px] border-[#3A1D7A] px-6 py-3 font-extrabold text-[#FFF6FB] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={{
        background: bg,
        boxShadow: "0 6px 0 #3A1D7A, inset 0 2px 0 rgba(255,255,255,.75)",
        textShadow: "0 2px 0 rgba(58,29,122,.55)",
        ...rest.style,
      }}
    >
      {children}
    </button>
  );
}

export function Panel({
  children,
  className = "",
  title,
  hint,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  hint?: string;
}) {
  return (
    <section className={`jewel-card p-5 sm:p-6 ${className}`}>
      {title && (
        <h2 className="mb-1 text-lg font-extrabold text-[#3A1D7A]">
          {title}
        </h2>
      )}
      {hint && <p className="mb-3 text-sm text-[#6C4BB0]">{hint}</p>}
      {children}
    </section>
  );
}

export function Chip({
  children,
  onRemove,
  tint = "#FF3EA5",
}: {
  children: ReactNode;
  onRemove?: () => void;
  tint?: string;
}) {
  return (
    <span
      className="animate-bead-in press inline-flex items-center gap-2 rounded-full border-[2.5px] border-[#3A1D7A] px-3 py-1 text-sm font-bold text-[#FFF6FB]"
      style={{
        background: `linear-gradient(150deg, #FFFFFF22, ${tint})`,
        boxShadow: "0 3px 0 #3A1D7A, inset 0 2px 0 rgba(255,255,255,.6)",
      }}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="remover"
          className="grid h-5 w-5 place-items-center rounded-full bg-[#3A1D7A] text-[11px] leading-none"
        >
          ✕
        </button>
      )}
    </span>
  );
}
