import { NextResponse } from "next/server";
import { listArchives } from "@/lib/digest";

export async function GET() {
  try {
    const slugs = await listArchives();
    return NextResponse.json({ slugs });
  } catch (error) {
    console.error("Archives error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
