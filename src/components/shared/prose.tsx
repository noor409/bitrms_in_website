export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-none space-y-5 text-base leading-relaxed text-brand-300">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
