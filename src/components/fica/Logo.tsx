export function Logo({ size = "text-6xl" }: { size?: string }) {
  return (
    <h1
      className={`logo-bubble select-none leading-[0.95] ${size}`}
      style={{ animation: "wobble 5s ease-in-out infinite" }}
    >
      ficacomigo
    </h1>
  );
}
