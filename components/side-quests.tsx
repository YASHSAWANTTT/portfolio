"use client";

import { useState } from "react";
import { quests, type WorkItem } from "@/lib/data";
import { ArrowRight } from "./icons";
import { SectionHeading } from "./section-heading";
import { WorkDialog } from "./work-dialog";

export function SideQuests() {
  const [active, setActive] = useState<WorkItem | null>(null);

  return (
    <section className="flex flex-col gap-2">
      <SectionHeading>Side Quests</SectionHeading>
      <ul className="flex flex-col">
        {quests.map((quest) => (
          <li key={quest.id}>
            <button
              type="button"
              onClick={() => setActive(quest)}
              className="flex min-h-10 w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-surface sm:h-10 sm:py-0 sm:px-3"
            >
              <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
                <span className="text-base leading-6 text-text sm:w-[120px] sm:shrink-0">
                  {quest.company}
                </span>
                <span className="text-sm leading-5 text-text-muted sm:flex-1 sm:text-base sm:leading-6">
                  {quest.role}
                </span>
              </span>
              <ArrowRight className="size-5 shrink-0 text-text-muted" />
            </button>
          </li>
        ))}
      </ul>
      {active ? (
        <WorkDialog item={active} onClose={() => setActive(null)} />
      ) : null}
    </section>
  );
}
