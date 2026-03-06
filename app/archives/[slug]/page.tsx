import { getDigest } from "@/lib/digest";
import DigestView from "@/components/DigestView";

export const dynamic = "force-dynamic";
export const revalidate = false;

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const digest = await getDigest(slug);
  return <DigestView digest={digest} archiveSlug={slug} />;
}
