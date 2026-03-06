import { getDigest } from "@/lib/digest";
import DigestView from "@/components/DigestView";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function Home() {
  const digest = await getDigest();
  return <DigestView digest={digest} isCurrent />;
}
