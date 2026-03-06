import { getDigest } from "@/lib/digest";
import { MOCK_DIGEST } from "@/lib/mock";
import DigestView from "@/components/DigestView";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function Home() {
  const digest = await getDigest() ?? (process.env.NODE_ENV === "development" ? MOCK_DIGEST : null);
  return <DigestView digest={digest} isCurrent />;
}
