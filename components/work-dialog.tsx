"use client";

import { useEffect } from "react";
import type { WorkItem } from "@/lib/data";
import { ArrowUpRight, CloseMark, InfoMark } from "./icons";

export function WorkDialog({
  item,
  onClose,
}: {
  item: WorkItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="work-dialog-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[rgba(12,10,9,0.4)]"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative flex max-h-dvh w-full max-w-[800px] flex-col rounded-t-[20px] bg-bg sm:max-h-[calc(100vh-80px)] sm:rounded-[20px]">
        <div className="relative z-30 flex shrink-0 items-center gap-2.5 overflow-visible border-b border-border p-2">
          <span className="group/info relative inline-flex shrink-0">
            <span className="flex size-6 items-center justify-center rounded-2xl text-text-muted">
              <InfoMark className="size-4" />
            </span>
            <span className="pointer-events-none absolute top-full left-0 z-10 mt-3 hidden w-[min(340px,calc(100vw-32px))] group-hover/info:block">
              <span className="relative block">
                <span className="absolute top-0 left-3 z-0 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-text" />
                <span className="relative z-10 block rounded bg-text px-3 py-2 text-xs leading-4 text-white">
                  {item.note}
                </span>
              </span>
            </span>
          </span>
          <p
            id="work-dialog-title"
            className="min-w-0 flex-1 text-center text-[13px] leading-5 text-text"
          >
            {item.company}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex size-6 shrink-0 items-center justify-center rounded-2xl text-text-muted transition-opacity hover:opacity-70"
            aria-label="Close"
          >
            <CloseMark className="size-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain rounded-b-[20px] [-webkit-overflow-scrolling:touch]">
          <div className="flex flex-col gap-8 p-4 sm:gap-12 sm:p-6">
            <div className="flex flex-col gap-8 border-b border-border pb-8 sm:gap-10 sm:pb-10">
              <div className="flex flex-col gap-4 sm:gap-6">
                <h2 className="text-xl leading-7 text-text sm:text-2xl sm:leading-8">
                  {item.dialogTitle}
                </h2>
                <p className="text-base leading-6 text-text-muted">{item.summary}</p>
              </div>
              <div
                className={`grid gap-3 ${
                  item.stats.length > 2
                    ? "grid-cols-2 min-[400px]:grid-cols-2 sm:grid-cols-4"
                    : "grid-cols-1 min-[400px]:grid-cols-2"
                }`}
              >
                {item.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-lg bg-surface px-4 py-4 text-center sm:px-6"
                  >
                    <p className="font-pixel text-xl leading-7 text-text sm:text-2xl sm:leading-8">
                      {stat.value}
                    </p>
                    <p className="text-xs leading-4 text-text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-12">
                <div className="flex flex-col gap-3">
                  <p className="text-[13px] leading-5 text-text-muted">Role</p>
                  <p className="text-base leading-5 text-text">{item.meta.role}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-[13px] leading-5 text-text-muted">When</p>
                  <p className="text-base leading-5 text-text">{item.meta.when}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-[13px] leading-5 text-text-muted">Where</p>
                  <p className="text-base leading-5 text-text">{item.meta.where}</p>
                </div>
              </div>
            </div>

            {item.projects.map((project) => (
              <section key={project.title} className="flex flex-col gap-4">
                <h3 className="text-base leading-5 text-text">{project.title}</h3>
                {project.image ? (
                  project.image.href ? (
                    <a
                      href={project.image.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={project.image.src}
                        alt={project.image.alt}
                        className="w-full rounded-lg border border-border object-cover transition-opacity hover:opacity-90"
                      />
                    </a>
                  ) : (
                    <img
                      src={project.image.src}
                      alt={project.image.alt}
                      className="w-full rounded-lg border border-border object-cover"
                    />
                  )
                ) : null}
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex h-6 items-center rounded-xl border border-border px-3 text-xs leading-4 text-text"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {item.links.length > 0 ? (
          <div className="flex shrink-0 items-center justify-end border-t border-border p-2">
            <div className="flex w-full flex-wrap justify-end gap-1.5">
              {item.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-6 items-center gap-1 rounded-2xl bg-surface pr-1.5 pl-2 text-[13px] leading-5 text-text transition-opacity hover:opacity-70"
                >
                  {link.label}
                  <ArrowUpRight className="size-4" />
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
