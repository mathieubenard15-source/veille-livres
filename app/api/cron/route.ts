import { NextRequest, NextResponse } from "next/server";
import { generateDigest } from "@/lib/digest";
import { sendTelegramNotification } from "@/lib/telegram";

export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { digest, slug } = await generateDigest();

    const bookCount =
      (digest.livresMajeurs?.length || 0) +
      (digest.livresInteressants?.length || 0) +
      (digest.livresSpecialises?.length || 0);

    const top3 = digest.selection
      .map((s) => `  ${s.rang}. <i>${s.titre}</i> — ${s.auteur}`)
      .join("\n");

    const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

    await sendTelegramNotification(
      `<b>Veille Livres</b> — Semaine ${digest.semaine}\n\n` +
        `<b>Selection :</b>\n${top3}\n\n` +
        `${bookCount} livres au catalogue cette semaine.\n\n` +
        `<a href="${baseUrl}">Voir le digest complet</a>`
    );

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Cron error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
