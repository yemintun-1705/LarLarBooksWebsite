import type { Metadata } from "next";
import AuthorShare from "./AuthorShare";

/**
 * Landing page for shared author links: https://www.larlarbooks.com/author/<id>?n=<name>
 *
 * The mobile app claims this path (Android app link), so people who have the app
 * never see this page. Everyone else lands here and gets the download buttons.
 * No database is involved: the name comes from the `n` query param that the
 * app puts in the share link.
 */

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const metadata: Metadata = {
  title: "LarLar Books",
  robots: { index: false, follow: false },
};

export default async function AuthorSharePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ n?: string | string[] }>;
}) {
  const { id } = await params;
  const { n } = await searchParams;
  const rawName = Array.isArray(n) ? n[0] : n;
  const name = rawName?.trim().slice(0, 80) || null;
  // Only build the app link for a well-formed id.
  const appLink = UUID_RE.test(id) ? `larlar0://author/${id}` : null;

  return <AuthorShare name={name} appLink={appLink} />;
}
