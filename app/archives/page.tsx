import { listArchives } from "@/lib/digest";
import ArchiveGrid from "@/components/ArchiveGrid";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function Archives() {
  const slugs = await listArchives();
  return <ArchiveGrid slugs={slugs} />;
}
