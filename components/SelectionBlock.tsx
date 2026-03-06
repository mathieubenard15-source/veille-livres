import type { BookSelection } from "@/lib/digest";

export default function SelectionBlock({ selection }: { selection: BookSelection[] }) {
  return (
    <section className="selection-block">
      <h2 className="section-title">Sélection de la semaine</h2>
      <div className="selection-list">
        {selection.map((book, i) => (
          <div key={book.rang} className={`selection-item ${i > 0 ? "selection-item--border" : ""}`}>
            <span className="selection-rang">
              {String(book.rang).padStart(2, "0")}
            </span>
            <h3 className="selection-titre">{book.titre}</h3>
            <p className="selection-meta">
              {book.auteur} &middot; {book.editeur}
              {book.parution && <> &middot; Parution {book.parution}</>}
            </p>
            <p className="selection-presentation">{book.presentation}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
