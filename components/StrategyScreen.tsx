import Image from "next/image";
import { Rubik } from "next/font/google";
import { BrainCircuit, Network, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
  fallback: ["system-ui", "sans-serif"],
});

const HEX_CLIP =
  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

const TAGLINE_TEXT =
  "אנחנו מפשטים אתגרים ארגוניים מורכבים באמצעות פתרונות טכנולוגיים חדשניים ומותאמים אישית, ומשמשים כשותף אסטרטגי המעניק תמיכה, אוטומציה וערך מדיד להצלחת הפלטפורמה שלך.";

function TechHexOutline({
  className,
  size,
  opacity = 0.1,
  rotation = 0,
}: {
  className: string;
  size: number;
  opacity?: number;
  rotation?: number;
}) {
  const height = size;
  const width = Math.round(size * 0.866);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 115.47"
      className={`pointer-events-none absolute ${className}`}
      style={{
        width,
        height,
        transform: `rotate(${rotation}deg)`,
        opacity,
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="50,0 100,28.87 100,86.6 50,115.47 0,86.6 0,28.87"
        stroke="#d4a017"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function TechDiamondOutline({
  className,
  size,
  opacity = 0.1,
  rotation = 0,
}: {
  className: string;
  size: number;
  opacity?: number;
  rotation?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={`pointer-events-none absolute ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
        opacity,
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="50,5 95,50 50,95 5,50" stroke="#d4a017" strokeWidth="1.5" />
    </svg>
  );
}

function TechAccentDot({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-[#d4a017] ${className}`}
    />
  );
}

function StrategyCinematicBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d0b07] to-[#030303]" />
      <div
        className="absolute left-1/2 top-[46%] h-[920px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundColor: "rgba(212, 160, 23, 0.25)",
          filter: "blur(120px)",
        }}
      />

      <div
        className="absolute -left-[8%] top-[2%] h-[480px] w-[480px] rounded-full"
        style={{ backgroundColor: "rgba(184, 134, 11, 0.35)", filter: "blur(100px)" }}
      />
      <div
        className="absolute -right-[6%] top-[4%] h-[440px] w-[440px] rounded-full"
        style={{ backgroundColor: "rgba(244, 196, 48, 0.25)", filter: "blur(100px)" }}
      />
      <div
        className="absolute bottom-[6%] left-[2%] h-[460px] w-[460px] rounded-full"
        style={{ backgroundColor: "rgba(160, 118, 31, 0.3)", filter: "blur(100px)" }}
      />
      <div
        className="absolute bottom-[4%] right-[4%] h-[420px] w-[420px] rounded-full"
        style={{ backgroundColor: "rgba(218, 165, 32, 0.25)", filter: "blur(100px)" }}
      />

      <TechHexOutline className="left-[4%] top-[8%]" size={180} opacity={0.1} rotation={-12} />
      <TechHexOutline className="right-[5%] top-[32%]" size={120} opacity={0.09} rotation={18} />
      <TechHexOutline className="left-[12%] top-[58%]" size={90} opacity={0.12} rotation={8} />
      <TechHexOutline className="right-[10%] top-[10%]" size={70} opacity={0.08} rotation={-22} />
      <TechHexOutline className="bottom-[22%] left-[22%]" size={60} opacity={0.1} rotation={15} />
      <TechHexOutline className="bottom-[30%] right-[18%]" size={100} opacity={0.09} rotation={-8} />

      <TechDiamondOutline className="left-[18%] top-[28%]" size={72} opacity={0.1} rotation={12} />
      <TechDiamondOutline className="right-[14%] top-[52%]" size={56} opacity={0.09} rotation={-16} />
      <TechDiamondOutline className="bottom-[16%] left-[42%]" size={64} opacity={0.11} rotation={24} />

      <TechAccentDot className="left-[8%] top-[42%] opacity-70" />
      <TechAccentDot className="right-[12%] top-[24%] opacity-60" />
      <TechAccentDot className="bottom-[18%] left-[32%] h-1 w-1 opacity-50" />
      <TechAccentDot className="right-[28%] bottom-[24%] opacity-65" />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(25deg, rgba(212, 160, 23, 0.04) 0, rgba(212, 160, 23, 0.04) 1px, transparent 1px, transparent 72px)",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_36%,rgba(0,0,0,0.72)_100%)]" />

      <div className="absolute bottom-0 left-1/2 h-[38%] w-[92%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,transparent_72%)]" />
    </div>
  );
}

function StrategyHexagon({
  icon: Icon,
  label,
  fadeClass,
}: {
  icon: LucideIcon;
  label: string;
  fadeClass: string;
}) {
  return (
    <div
      className={`strategy-hex-fade ${fadeClass} flex h-[416px] w-[360px] items-center justify-center`}
      style={{ filter: "drop-shadow(0 0 36px rgba(212, 160, 23, 0.36))" }}
    >
      <div
        className="flex h-full w-full items-center justify-center"
        style={{
          clipPath: HEX_CLIP,
          background: "linear-gradient(145deg, #d4a017 0%, #f4c430 48%, #d4a017 100%)",
        }}
      >
        <div
          className="flex h-[94%] w-[94%] flex-col items-center justify-center gap-7 px-6"
          style={{
            clipPath: HEX_CLIP,
            background:
              "radial-gradient(ellipse at 50% 38%, #0a0a0a 0%, #141414 45%, #222222 100%)",
          }}
        >
          <Icon
            className="h-[120px] w-[120px] shrink-0 text-[#f4c430]"
            strokeWidth={1.35}
            aria-hidden="true"
          />
          <p
            dir="ltr"
            className="text-center text-3xl font-bold leading-tight text-[#f5f5f5] xl:text-4xl"
            style={{ fontFeatureSettings: '"kern" 1' }}
          >
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

export function StrategyScreen() {
  return (
    <div
      dir="rtl"
      lang="he"
      className={`${rubik.className} strategy-screen relative h-full overflow-hidden`}
    >
      <StrategyCinematicBackground />

      <div className="absolute right-8 top-8 z-20 strategy-logo-fade">
        <Image
          src="/dna-it-white-yellow-square.svg"
          alt="DnA IT"
          width={120}
          height={120}
          priority
          className="h-auto w-24 sm:w-28 xl:w-32"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center px-10 pb-10 pt-20">
        <h1
          className="strategy-title-fade max-w-5xl text-center text-6xl font-black leading-tight tracking-wide text-[#F4D03F] sm:text-7xl xl:text-[5rem]"
          style={{
            fontFeatureSettings: '"kern" 1',
            textShadow: "0 0 40px rgba(244, 208, 63, 0.4)",
          }}
        >
          תחומי ההתמחות והאסטרטגיה שלנו
        </h1>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-12 xl:gap-16">
          <StrategyHexagon
            icon={Shield}
            label="Cyber Security"
            fadeClass="strategy-hex-fade-1"
          />
          <StrategyHexagon
            icon={Network}
            label="Communication"
            fadeClass="strategy-hex-fade-2"
          />
          <StrategyHexagon
            icon={BrainCircuit}
            label="Data & AI"
            fadeClass="strategy-hex-fade-3"
          />
        </div>

        <div className="strategy-tagline-fade mt-10 xl:mt-12">
          <div
            className="relative mx-auto w-full max-w-[1100px] rounded-3xl border-2 border-[#F4D03F] bg-[#0a0a0a] p-12 shadow-[0_0_60px_rgba(244,208,63,0.5),0_0_120px_rgba(244,208,63,0.25)]"
            style={{ animation: "cardGlow 3s ease-in-out infinite" }}
          >
            <p
              className="text-center text-2xl font-bold leading-relaxed text-white"
              style={{ fontFeatureSettings: '"kern" 1' }}
            >
              {TAGLINE_TEXT}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
