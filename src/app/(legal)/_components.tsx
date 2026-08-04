import React from "react";

/**
 * Shared presentational helpers for the bilingual compliance pages.
 * `_components.tsx` lives in a folder ignored by the router (leading underscore),
 * so it never becomes a route.
 */

const myFont = { fontFamily: 'var(--font-myanmar-legal), "Noto Sans Myanmar", sans-serif' };

/** Inline Burmese text — applies the scoped Noto Sans Myanmar font. */
export function My({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span lang="my" style={myFont} className={className}>
      {children}
    </span>
  );
}

/** Block-level Burmese paragraph. */
export function MyBlock({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p lang="my" style={{ ...myFont, lineHeight: 1.9 }} className={className}>
      {children}
    </p>
  );
}

/**
 * Amber placeholder box. Marks copy that must be supplied/reviewed by the owner
 * before this page ships. Deliberately loud so it can't be missed in review.
 */
export function Pending({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-2 rounded-md border border-amber-500/50 bg-amber-500/10 px-3 py-2 text-sm text-amber-300">
      <span className="mr-2 font-semibold uppercase tracking-wide">
        Pending
      </span>
      {children}
    </p>
  );
}

/** One policy section: Burmese first, then the English counterpart. */
export function Section({
  index,
  myTitle,
  myBody,
  enTitle,
  enBody,
  enPending = false,
}: {
  index: string;
  myTitle: string;
  myBody: string;
  enTitle: string;
  enBody?: string;
  enPending?: boolean;
}) {
  return (
    <section className="border-t border-[#333] py-6">
      <div className="mb-4">
        <h2 lang="my" style={myFont} className="mb-2 text-base font-semibold text-white">
          {myTitle}
        </h2>
        <MyBlock className="text-[15px] text-[#bbb]">{myBody}</MyBlock>
      </div>
      <div>
        <h3 className="mb-2 text-base font-semibold text-white">
          {index}. {enTitle}
        </h3>
        {enPending || !enBody ? (
          <Pending>
            English copy for &ldquo;{enTitle}&rdquo; goes here. Replace this with
            the reviewed English translation of the Burmese above.
          </Pending>
        ) : (
          <p className="text-[15px] leading-relaxed text-[#bbb]">{enBody}</p>
        )}
      </div>
    </section>
  );
}
