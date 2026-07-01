import Image from "next/image";

function HalftoneCorner({ position }: { position: "top-right" | "bottom-left" }) {
  const isTopRight = position === "top-right";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-[1] h-[58%] w-[38%] opacity-50 ${
        isTopRight ? "right-0 top-0" : "bottom-0 left-0"
      }`}
      style={{
        backgroundImage:
          "radial-gradient(circle, #DAA520 1px, transparent 1px)",
        backgroundSize: "12px 12px",
        WebkitMaskImage: isTopRight
          ? "radial-gradient(ellipse 120% 110% at top right, #000 22%, transparent 88%)"
          : "radial-gradient(ellipse 120% 110% at bottom left, #000 22%, transparent 88%)",
        maskImage: isTopRight
          ? "radial-gradient(ellipse 120% 110% at top right, #000 22%, transparent 88%)"
          : "radial-gradient(ellipse 120% 110% at bottom left, #000 22%, transparent 88%)",
      }}
    />
  );
}

function CircuitDecoration({ side }: { side: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 720"
      className={`pointer-events-none absolute top-1/2 z-[2] h-[82%] w-44 -translate-y-1/2 opacity-60 sm:w-52 xl:w-56 ${
        side === "left" ? "left-[22%]" : "right-[22%] scale-x-[-1]"
      }`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 48 V200 Q12 222 36 222 H148"
        stroke="#DAA520"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="148" cy="222" r="4" fill="#DAA520" />
      <path
        d="M12 48 Q40 48 40 76 H108"
        stroke="#DAA520"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="108" cy="76" r="3" fill="#DAA520" />

      <path
        d="M12 310 V460 Q12 482 44 482 H158"
        stroke="#DAA520"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="158" cy="482" r="4" fill="#DAA520" />
      <path
        d="M44 482 V520 H118"
        stroke="#DAA520"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="118" cy="520" r="3" fill="#DAA520" />

      <path
        d="M12 560 V660 Q12 682 38 682 H132"
        stroke="#DAA520"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="132" cy="682" r="4" fill="#DAA520" />
      <path
        d="M12 310 Q12 280 48 280 H122"
        stroke="#DAA520"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="122" cy="280" r="3" fill="#DAA520" />
    </svg>
  );
}

function CornerAccent({ position }: { position: "top-right" | "bottom-left" }) {
  const isTopRight = position === "top-right";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 160"
      className={`pointer-events-none absolute z-[3] h-[160px] w-[160px] ${
        isTopRight ? "right-0 top-0" : "bottom-0 left-0"
      }`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {isTopRight ? (
        <polygon points="160,0 0,0 160,112" fill="#F4D03F" />
      ) : (
        <polygon points="0,160 160,160 0,40" fill="#F4D03F" />
      )}
    </svg>
  );
}

function CenterBridge() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2]">
      <span className="absolute left-[30%] top-[36%] block h-px w-20 bg-gradient-to-r from-[#DAA520]/55 to-transparent sm:w-24" />
      <span className="absolute right-[30%] top-[36%] block h-px w-20 bg-gradient-to-l from-[#DAA520]/55 to-transparent sm:w-24" />
      <span className="absolute left-[32%] top-[64%] block h-px w-14 bg-gradient-to-r from-[#DAA520]/40 to-transparent sm:w-20" />
      <span className="absolute right-[32%] top-[64%] block h-px w-14 bg-gradient-to-l from-[#DAA520]/40 to-transparent sm:w-20" />
      <span className="absolute left-[34%] top-[50%] h-2 w-2 -translate-y-1/2 rounded-full bg-[#DAA520]/35" />
      <span className="absolute right-[34%] top-[50%] h-2 w-2 -translate-y-1/2 rounded-full bg-[#DAA520]/35" />
    </div>
  );
}

export function InnovationScreen() {
  return (
    <div className="innovation-screen relative h-full overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[#fdfcf7]"
      />

      <HalftoneCorner position="top-right" />
      <HalftoneCorner position="bottom-left" />

      <CircuitDecoration side="left" />
      <CircuitDecoration side="right" />

      <CenterBridge />

      <CornerAccent position="bottom-left" />
      <CornerAccent position="top-right" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-10 py-8">
        <div className="text-center">
          <div className="innovation-logo-fade mb-6 flex justify-center sm:mb-8">
            <Image
              src="/dna-it-black-yellow-tp.svg"
              alt="DnA IT"
              width={200}
              height={248}
              priority
              className="h-auto w-40 sm:w-44 xl:w-52"
            />
          </div>

          <p className="innovation-line-fade innovation-line-fade-1 text-5xl font-bold tracking-tight text-[#0a0a0a] sm:text-6xl xl:text-7xl">
            Delivering
          </p>

          <div className="innovation-line-fade innovation-line-fade-2 mt-1">
            <span className="innovation-gold-shine text-7xl font-black leading-[0.95] tracking-[-0.03em] sm:text-8xl xl:text-[9.5rem]">
              Innovation
            </span>
          </div>

          <div className="innovation-line-fade innovation-line-fade-3 mt-5 flex flex-col items-center gap-3">
            <p className="text-3xl font-normal tracking-wide text-[#4a4a4a] sm:text-4xl xl:text-5xl">
              Through
            </p>
            <span
              aria-hidden="true"
              className="h-px w-28 bg-gradient-to-r from-transparent via-[#d4a017] to-transparent sm:w-36"
            />
          </div>

          <div className="innovation-line-fade innovation-line-fade-4 mt-6">
            <p className="text-6xl font-bold tracking-tight text-[#0a0a0a] sm:text-7xl xl:text-8xl">
              Enterprise{" "}
              <span className="innovation-gold-shine text-6xl font-black sm:text-7xl xl:text-8xl">
                AI
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
