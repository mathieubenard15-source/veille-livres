"use client";

import { useState } from "react";
import type { Book } from "@/lib/digest";

export default function BookCard({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`book-card ${open ? "book-card--open" : ""}`}>
      <button className="book-card-header" onClick={() => setOpen(!open)}>
        <div className="book-card-info">
          <span className="book-card-title">{book.titre}</span>
          <span className="book-card-author">{book.auteur}</span>
          {book.theme && <span className="book-card-pill">{book.theme}</span>}
        </div>
        <span className={`book-card-chevron ${open ? "book-card-chevron--open" : ""}`}>
          ›
        </span>
      </button>
      {open && (
        <div className="book-card-body">
          <p>
            <strong>Éditeur :</strong> {book.editeur}
            {book.parution && <> &middot; <strong>Parution :</strong> {book.parution}</>}
          </p>
          {book.resume && (
            <p><strong>Résumé :</strong> {book.resume}</p>
          )}
          {book.interet && (
            <p><strong>Intérêt :</strong> {book.interet}</p>
          )}
          {book.publicCible && (
            <p><strong>Public cible :</strong> {book.publicCible}</p>
          )}
        </div>
      )}
    </div>
  );
}
