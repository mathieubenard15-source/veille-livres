import { NextRequest, NextResponse } from "next/server";
import { generateDigest, getDigest } from "@/lib/digest";

export async function GET() {
  try {
    const digest = await getDigest();
    if (!digest) {
      return NextResponse.json({ error: "No digest available" }, { status: 404 });
    }
    return NextResponse.json(digest);
  } catch (error) {
    console.error("Generate GET error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { digest, slug } = await generateDigest();
    return NextResponse.json({ success: true, slug, digest });
  } catch (error) {
    console.error("Generate POST error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
