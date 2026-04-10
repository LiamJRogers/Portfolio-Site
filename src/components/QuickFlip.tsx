export function QuickFlip({ label }: { label: string }) {
  return (
    <span
      className="quick-flip inline-block overflow-hidden align-bottom"
      style={{ height: "1em" }}
    >
      <span className="quick-flip-inner flex flex-col">
        <span>{label}</span>
        <span>{label}</span>
      </span>
    </span>
  );
}
