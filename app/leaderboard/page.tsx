import Image from "next/image";
import Link from "next/link";
import { LeaderboardTable } from "@/components/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(244,208,63,0.22),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(229,233,237,0.08),_transparent_28%),linear-gradient(135deg,_#000000,_#080808_58%,_#141414)] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Image
              src="/DNA.png"
              alt="DNA IT"
              width={170}
              height={70}
              priority
              className="h-auto w-36 md:w-44"
            />
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F4D03F]">
              DNA IT x Nutanix
            </p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-[#F4D03F]/50 px-4 py-2 text-sm font-bold text-[#F4D03F] hover:bg-[#F4D03F] hover:text-black"
          >
            Register
          </Link>
        </div>
        <LeaderboardTable />
      </div>
    </main>
  );
}
