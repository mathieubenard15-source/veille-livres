import { Redis } from "@upstash/redis";
import { SYSTEM_PROMPT, getUserPrompt, getWeekLabel, getWeekKey } from "./prompt";

const kvAvailable = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

function getKv() {
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

export interface BookSelection {
  rang: number;
  titre: string;
  auteur: string;
  editeur: string;
  presentation: string;
}

export interface Book {
  titre: string;
  auteur: string;
  editeur: string;
  parution: string;
  theme: string;
  resume: string;
  interet: string;
  publicCible: string;
}

export interface Digest {
  semaine: string;
  generatedAt: string;
  selection: BookSelection[];
  livresMajeurs: Book[];
  livresInteressants: Book[];
  livresSpecialises: Book[];
  tendances: string[];
  priorites: string[];
}

export async function generateDigest(): Promise<{ digest: Digest; slug: string }> {
  const weekLabel = getWeekLabel();
  const slug = getWeekKey();

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
      "anthropic-beta": "web-search-2025-03-05",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: getUserPrompt(weekLabel) }],
      tools: [{ type: "web_search_20250305", name: "web_search" }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API error: ${response.status} ${err}`);
  }

  const data = await response.json();

  const text = data.content
    .filter((b: { type: string }) => b.type === "text")
    .map((b: { text: string }) => b.text)
    .join("\n");

  // Extract JSON from response — Claude may wrap it in text or markdown fences
  const cleaned = text.replace(/```json|```/g, "").trim();
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error(`No JSON found in response: ${cleaned.slice(0, 200)}`);
  }
  const parsed: Digest = JSON.parse(jsonMatch[0]);
  parsed.generatedAt = new Date().toISOString();

  // Store in KV
  const kv = getKv();
  await kv.set(`digest:${slug}`, JSON.stringify(parsed), { ex: 365 * 24 * 3600 });
  await kv.set("digest:latest", `digest:${slug}`);

  // Add to index (avoid duplicates)
  const existing = await kv.lrange<string>("digest:index", 0, -1);
  if (!existing.includes(slug)) {
    await kv.lpush("digest:index", slug);
  }

  return { digest: parsed, slug };
}

export async function getDigest(slug?: string): Promise<Digest | null> {
  if (!kvAvailable) return null;
  const kv = getKv();
  let key: string;
  if (slug) {
    key = `digest:${slug}`;
  } else {
    const latestKey = await kv.get<string>("digest:latest");
    if (!latestKey) return null;
    key = latestKey;
  }
  const raw = await kv.get<string>(key);
  if (!raw) return null;
  return typeof raw === "string" ? JSON.parse(raw) : raw as unknown as Digest;
}

export async function listArchives(): Promise<string[]> {
  if (!kvAvailable) return [];
  const kv = getKv();
  return kv.lrange<string>("digest:index", 0, -1);
}
