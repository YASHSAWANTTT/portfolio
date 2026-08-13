import { site } from "@/lib/data";
import { ArrowUpRight, LinkedInMark } from "./icons";

export function Hero() {
  return (
    <section className="flex flex-col gap-8 px-2 sm:gap-10 sm:px-3">
      <header className="flex min-w-0 items-center gap-2 pb-2 sm:gap-2.5">
        <p className="min-w-0 flex-1 truncate text-base leading-7 text-text">
          {site.name}
        </p>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 rounded-md sm:gap-2"
        >
          <span className="inline-flex h-6 shrink-0 items-center gap-1 rounded-2xl bg-surface pr-1.5 pl-2 text-[13px] leading-5 text-text transition-opacity hover:opacity-70">
            <LinkedInMark className="size-3.5" />
            <span className="whitespace-nowrap text-text-muted">
              {site.followers} followers
            </span>
            <ArrowUpRight className="size-3.5 text-text-muted" />
          </span>
        </a>
      </header>

      <div className="flex flex-col gap-6">
        <h1 className="text-2xl leading-8 font-normal text-text">
          {site.headline}
        </h1>
        <div className="text-base leading-6 text-text-muted">
          {site.bio.map((paragraph, index) => (
            <p key={paragraph} className={index === 0 ? undefined : "mt-6"}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-8 items-center rounded-2xl bg-text px-3 py-1 text-sm leading-5 font-medium text-white transition-opacity hover:opacity-85"
          >
            Contact me
          </a>
        </div>
      </div>
    </section>
  );
}
