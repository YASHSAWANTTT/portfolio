export function SectionHeading({ children }: { children: string }) {
  return (
    <>
      <div className="flex h-8 items-center px-2 py-4 sm:px-3">
        <h2 className="text-sm leading-5 font-medium text-text-section">
          {children}
        </h2>
      </div>
      <div className="px-2 sm:px-3">
        <div className="h-px w-full bg-border" />
      </div>
    </>
  );
}
