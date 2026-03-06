import { NextRequest, NextResponse } from "next/server";
import { Document, Paragraph, TextRun, AlignmentType, Packer, convertInchesToTwip } from "docx";
import { getDigest } from "@/lib/digest";
import { MOCK_DIGEST } from "@/lib/mock";
import type { Digest } from "@/lib/digest";

function buildDocx(digest: Digest): Document {
  const paragraphs: Paragraph[] = [];

  digest.selection.forEach((book, i) => {
    const presentation = book.presentation;
    const title = book.titre;
    const prefix = `${i + 1}. `;
    const parts: TextRun[] = [];

    // Find book title in presentation text (case-insensitive)
    const lowerText = presentation.toLowerCase();
    const lowerTitle = title.toLowerCase();
    const titleIndex = lowerText.indexOf(lowerTitle);

    if (titleIndex !== -1) {
      const before = presentation.slice(0, titleIndex);
      const matchedTitle = presentation.slice(titleIndex, titleIndex + title.length);
      const after = presentation.slice(titleIndex + title.length);

      parts.push(new TextRun({ text: prefix + before }));
      parts.push(new TextRun({ text: matchedTitle, italics: true }));
      if (after) parts.push(new TextRun({ text: after }));
    } else {
      // Title not found in text — prepend it italicized
      parts.push(new TextRun({ text: prefix }));
      parts.push(new TextRun({ text: title, italics: true }));
      parts.push(new TextRun({ text: ` de ${book.auteur} (${book.editeur}). ${presentation}` }));
    }

    paragraphs.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: parts,
      })
    );
  });

  // Empty paragraph at end
  paragraphs.push(new Paragraph({}));

  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
            },
          },
        },
        children: paragraphs,
      },
    ],
  });
}

function getFilename(digest: Digest): string {
  // Extract a date from generatedAt or use current date
  const date = digest.generatedAt ? new Date(digest.generatedAt) : new Date();
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `Veille Livres - ${dd}.${mm}.${yyyy}.docx`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || undefined;

  let digest = await getDigest(slug);
  if (!digest && process.env.NODE_ENV === "development") {
    digest = MOCK_DIGEST;
  }
  if (!digest) {
    return NextResponse.json({ error: "No digest available" }, { status: 404 });
  }

  const doc = buildDocx(digest);
  const buffer = await Packer.toBuffer(doc);
  const filename = getFilename(digest);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
