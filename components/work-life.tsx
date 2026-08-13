"use client";

import { useState } from "react";
import { work, type WorkItem } from "@/lib/data";
import { ArrowRight } from "./icons";
import { SectionHeading } from "./section-heading";
import { WorkDialog } from "./work-dialog";

export function WorkLife() {
  const [active, setActive] = useState<WorkItem | null>(null);

  return (
    <section className="flex flex-col gap-2">
      <SectionHeading>Work Life</SectionHeading>
      <ul className="flex flex-col">
        {work.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setActive(item)}
              className="flex min-h-10 w-full cursor-pointer items-start gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-surface sm:h-10 sm:items-center sm:py-0 sm:px-3"
            >
              <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:flex-nowrap sm:items-center sm:gap-3">
                <span className="min-w-0 flex-1 text-base leading-6 text-text sm:w-[120px] sm:flex-none">
                  {item.company}
                </span>
                <span className="shrink-0 font-mono text-xs leading-5 text-text-muted sm:order-3 sm:ml-auto sm:whitespace-nowrap">
                  {item.dates}
                </span>
                <span className="basis-full text-sm leading-5 text-text-muted sm:order-2 sm:basis-auto sm:flex-1">
                  {item.role}
                </span>
              </span>
              <ArrowRight className="mt-0.5 size-5 shrink-0 self-start text-text-muted sm:mt-0 sm:self-center" />
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
