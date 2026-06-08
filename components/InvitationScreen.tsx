export function InvitationScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-10 py-8 text-center">
      <h2 className="invitation-heading-pulse text-7xl font-black tracking-tight text-[#F4D03F] sm:text-8xl xl:text-9xl">
        PLAY THE CHALLENGE
      </h2>
      <p className="mt-10 whitespace-nowrap text-4xl font-bold text-slate-200">
        Answer 7 questions. Beat the clock. Win prizes.
      </p>
      <p className="mt-14 flex flex-nowrap items-center justify-center gap-x-14 whitespace-nowrap text-4xl font-black text-[#F4D03F]">
        <span>iPhone</span>
        <span>Vacuum cleaner</span>
        <span>Microwave</span>
      </p>
      <p className="mt-16 flex items-center justify-center gap-5 text-3xl font-bold text-white sm:text-4xl">
        <span className="invitation-arrow-swing inline-block text-[#F4D03F]">
          ►
        </span>
        <span>Grab a tablet at our booth!!!</span>
        <span className="invitation-arrow-swing-reverse inline-block text-[#F4D03F]">
          ◄
        </span>
      </p>
      <p className="mt-20 text-xl font-bold tracking-[0.42em] text-[#F4D03F]/60 sm:text-2xl">
        DnA IT × Commvault
      </p>
    </div>
  );
}
