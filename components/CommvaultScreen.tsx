import Image from "next/image";
import { Rubik } from "next/font/google";
import { Check } from "lucide-react";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
  fallback: ["system-ui", "sans-serif"],
});

const BULLETS = [
  "שותף Elite של Commvault משנת 2015",
  "מעל 200 התקנות בכל המגזרים",
  "ליווי מלא כולל Day2, תמיכה, אוטומציה ושילוב",
] as const;

function HalftoneCorner({ position }: { position: "top-right" | "bottom-left" }) {
  const isTopRight = position === "top-right";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-[1] h-[58%] w-[38%] opacity-50 ${
        isTopRight ? "right-0 top-0" : "bottom-0 left-0"
      }`}
      style={{
        backgroundImage: "radial-gradient(circle, #DAA520 1px, transparent 1px)",
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
      className={`pointer-events-none absolute top-1/2 z-[2] h-[82%] w-36 -translate-y-1/2 opacity-50 sm:w-44 xl:w-48 ${
        side === "left" ? "left-0" : "right-0 scale-x-[-1]"
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

function StrongCornerAccent({ position }: { position: "top-right" | "bottom-left" }) {
  const isTopRight = position === "top-right";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 280 200"
      className={`pointer-events-none absolute z-[2] ${
        isTopRight ? "right-0 top-0 h-[200px] w-[280px]" : "bottom-0 left-0 h-[180px] w-[250px]"
      }`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {isTopRight ? (
        <polygon points="280,0 0,0 280,175" fill="#F4D03F" />
      ) : (
        <polygon points="0,180 250,180 0,0" fill="#F4D03F" />
      )}
    </svg>
  );
}

function EdgeYellowBand() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-[10%] z-[2] h-[80%] w-10 bg-[#F4D03F] sm:w-12"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-[2] h-6 w-[42%] bg-[#F4D03F] sm:h-8"
      />
    </>
  );
}

export function CommvaultScreen() {
  return (
    <div
      dir="rtl"
      lang="he"
      className={`${rubik.className} commvault-screen relative h-full overflow-hidden`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[#fdfcf7]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_55%,rgba(244,208,63,0.14),transparent_72%)]"
      />

      <StrongCornerAccent position="top-right" />
      <StrongCornerAccent position="bottom-left" />
      <EdgeYellowBand />
      <HalftoneCorner position="top-right" />
      <HalftoneCorner position="bottom-left" />
      <CircuitDecoration side="left" />
      <CircuitDecoration side="right" />

      <div className="relative z-10 flex h-full flex-col">
        <header className="flex shrink-0 justify-end px-12 pt-12 sm:px-14 sm:pt-14">
          <div className="commvault-logos-fade">
            <Image
              src="/dna-it-black-yellow-tp.svg"
              alt="DnA IT"
              width={220}
              height={60}
              priority
              className="h-auto w-40 sm:w-48 xl:w-52"
            />
          </div>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center px-12 pb-12 sm:px-14 sm:pb-14">
          <div
            className="relative mx-auto w-full max-w-[1500px] rounded-3xl border-2 border-[#F4D03F] bg-[#0a0a0a] p-12 shadow-[0_0_60px_rgba(244,208,63,0.5),0_0_120px_rgba(244,208,63,0.25)]"
            style={{ animation: "cardGlow 3s ease-in-out infinite" }}
          >
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
              <div className="flex flex-col items-start text-start">
                <div className="commvault-logos-fade mb-8 flex items-center gap-4">
                  <Image
                    src="/images/commvault/image-4.png"
                    alt="Commvault Cloud"
                    width={240}
                    height={60}
                    priority
                    className="h-auto w-44 sm:w-52"
                  />
                  <Image
                    src="/images/commvault/image-3.png"
                    alt="Commvault Elite Solution Provider"
                    width={100}
                    height={100}
                    className="h-auto w-20 shadow-[0_8px_24px_rgba(0,0,0,0.25)] sm:w-24"
                  />
                </div>

                <h1
                  className="commvault-headline-fade w-full text-[60px] font-black leading-[1.15] tracking-wide text-[#F4D03F] xl:text-[68px]"
                  style={{
                    fontFeatureSettings: '"kern" 1',
                    textShadow: "0 0 40px rgba(244, 208, 63, 0.4)",
                  }}
                >
                  פלטפורמה מובילה לניהול חוסן סייבר
                </h1>

                <ul className="mt-6 flex w-full flex-col gap-5">
                  {BULLETS.map((bullet, index) => (
                    <li
                      key={bullet}
                      className={`commvault-bullet-fade commvault-bullet-fade-${index + 1} flex w-full items-start justify-start gap-4`}
                    >
                      <Check
                        className="mt-1.5 h-9 w-9 shrink-0 text-[#F4D03F]"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                      <span
                        className="text-start text-[35px] font-bold leading-snug text-white xl:text-[40px]"
                        style={{ fontFeatureSettings: '"kern" 1' }}
                      >
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="commvault-images-fade relative flex items-center justify-center">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,208,63,0.2),transparent_68%)]"
                />
                <div dir="ltr" className="relative w-full max-w-2xl pb-14">
                  <Image
                    src="/images/commvault/image-1.png"
                    alt=""
                    width={800}
                    height={600}
                    className="relative z-[1] ms-auto block h-auto w-[95%] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                  />
                  <Image
                    src="/images/commvault/image-2.png"
                    alt=""
                    width={480}
                    height={360}
                    className="absolute bottom-0 left-0 z-[2] h-auto w-[65%] -rotate-6 rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.3)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
