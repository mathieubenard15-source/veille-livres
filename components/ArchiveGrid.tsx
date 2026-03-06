import Link from "next/link";

function formatSlug(slug: string): string {
  const date = new Date(slug + "T00:00:00");
  const day = date.getDate();
  const month = date.toLocaleDateString("fr-FR", { month: "long" });
  const year = date.getFullYear();
  // Week number (ISO)
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000);
  const weekNum = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `Sem. ${weekNum} — ${day} ${month} ${year}`;
}

export default function ArchiveGrid({ slugs }: { slugs: string[] }) {
  return (
    <section className="archive-section">
      <div className="archive-header">
        <h1 className="section-title">Archives</h1>
        <span className="archive-count">{slugs.length} édition{slugs.length > 1 ? "s" : ""}</span>
      </div>
      <div className="archive-grid">
        {slugs.map((slug, i) => (
          <Link
            key={slug}
            href={`/archives/${slug}`}
            className="archive-card"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="archive-card-label">{formatSlug(slug)}</span>
            <span className="archive-card-link">Voir &rarr;</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
