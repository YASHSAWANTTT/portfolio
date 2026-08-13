import { Approach } from "@/components/approach";
import { Contact } from "@/components/contact";
import { Grass } from "@/components/grass";
import { PixelLiquidBg } from "@/components/ui/pixel-liquid-bg";
import { Hero } from "@/components/hero";
import { SideQuests } from "@/components/side-quests";
import { WorkLife } from "@/components/work-life";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-bg">
      <PixelLiquidBg
        className="site-fluid pointer-events-none fixed inset-0 z-0 h-auto"
        pixelSize={14}
        resolution={0.35}
        mouseForce={6}
        cursorSize={100}
        autoDemo
      />
      <div className="relative z-10 flex w-full flex-1 justify-center">
        <div className="relative w-full max-w-[600px] px-1 pt-2 sm:px-0">
          <div aria-hidden className="site-read" />
          <div className="relative flex flex-col gap-12 sm:gap-16">
            <Hero />
            <div className="flex w-full flex-col gap-10">
              <WorkLife />
              <SideQuests />
              <Approach />
              <Contact />
            </div>
          </div>
        </div>
      </div>
      <Grass />
    </main>
  );
}
