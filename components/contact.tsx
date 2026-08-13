import { site } from "@/lib/data";
import { EmailMark, GitHubMark, LinkedInMark } from "./icons";
import { SectionHeading } from "./section-heading";

export function Contact() {
  return (
    <section className="flex flex-col gap-2">
      <SectionHeading>Contact</SectionHeading>
      <div className="flex flex-wrap items-center justify-between gap-4 px-2">
        <div className="flex min-w-0 items-center gap-4 sm:gap-6">
          <a
            href={`mailto:${site.email}`}
            className="flex min-w-0 items-center gap-1.5 transition-opacity hover:opacity-70"
          >
            <EmailMark className="size-4 shrink-0 sm:size-5" />
            <span className="text-sm leading-5 text-text sm:text-base sm:leading-6">
              Send me an email
            </span>
          </a>
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            aria-label="GitHub"
          >
            <GitHubMark className="size-5 shrink-0 sm:size-6" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            aria-label="LinkedIn"
          >
            <LinkedInMark className="size-5 shrink-0 sm:size-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
