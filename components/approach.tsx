import { approach } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export function Approach() {
  return (
    <section className="flex flex-col gap-2">
      <SectionHeading>Approach</SectionHeading>
      <ol className="flex flex-col">
        {approach.map((item) => (
          <li key={item.n} className="flex gap-3 rounded-md p-2">
            <span className="font-pixel w-5 shrink-0 text-base leading-6 not-italic text-text-muted">
              {item.n}
            </span>
            <div className="flex flex-1 flex-col gap-2">
              <p className="text-base leading-6 font-medium text-text">
                {item.title}
              </p>
              <p className="text-base leading-6 text-text-muted">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
