"use client";

import { useState } from "react";
import type { Digest, Book } from "@/lib/digest";
import SelectionBlock from "./SelectionBlock";
import BookCard from "./BookCard";

function BookSection({ title, books }: { title: string; books: Book[] }) {
  const [open, setOpen] = useState(false);

  if (!books || books.length === 0) return null;

  return (
    <div className="book-section">
      <button className="book-section-toggle" onClick={() => setOpen(!open)}>
        <h3>{title}</h3>
        <span className="book-section-count">{books.length} livre{books.length > 1 ? "s" : ""}</span>
        <span className={`book-section-chevron ${open ? "book-section-chevron--open" : ""}`}>
          ›
        </span>
      </button>
      {open && (
        <div className="book-section-list">
          {books.map((book, i) => (
            <BookCard key={i} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DigestView({
  digest,
  isCurrent,
  archiveSlug,
}: {
  digest: Digest | null;
  isCurrent?: boolean;
  archiveSlug?: string;
}) {
  if (!digest) {
    return (
      <div className="digest-empty">
        <h1>Veille Livres</h1>
        <p>Aucun digest disponible pour le moment.</p>
        <p>Le prochain sera généré mercredi à 17h.</p>
      </div>
    );
  }

  const generatedDate = digest.generatedAt
    ? new Date(digest.generatedAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="digest">
      {archiveSlug && (
        <div className="digest-archive-banner">
          <a href="/archives">&larr; Archives</a>
          <span>&middot;</span>
          <span>Édition du {archiveSlug}</span>
        </div>
      )}

      <header className="digest-hero">
        <div className="digest-hero-top">
          <div>
            {isCurrent && <h1 className="digest-title">Veille Livres</h1>}
            <p className="digest-semaine">Semaine {digest.semaine}</p>
            {generatedDate && (
              <p className="digest-date">Généré le {generatedDate}</p>
            )}
          </div>
          <a
            href={`/api/docx${archiveSlug ? `?slug=${archiveSlug}` : ""}`}
            className="download-btn"
          >
            Télécharger .docx
          </a>
        </div>
      </header>

      {digest.selection && digest.selection.length > 0 && (
        <SelectionBlock selection={digest.selection} />
      )}

      <section className="catalogue">
        <h2 className="section-title">Catalogue complet</h2>
        <BookSection title="Livres majeurs" books={digest.livresMajeurs} />
        <BookSection title="Livres intéressants" books={digest.livresInteressants} />
        <BookSection title="Livres spécialisés" books={digest.livresSpecialises} />
      </section>

      {digest.tendances && digest.tendances.length > 0 && (
        <section className="tendances">
          <h2 className="section-title">Tendances éditoriales</h2>
          <ul>
            {digest.tendances.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      {digest.priorites && digest.priorites.length > 0 && (
        <section className="priorites">
          <h2 className="section-title">À lire en priorité</h2>
          <ul>
            {digest.priorites.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
