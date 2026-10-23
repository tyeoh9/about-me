import type { Paragraph } from "@/content/profile";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <a href={href}>{children}</a>
  );
}

/** Renders a paragraph's spans inline; linked spans become links. */
export function RichText({ spans }: { spans: Paragraph }) {
  return spans.map((span, i) => {
    if (typeof span === "string") return span;
    if (!span.href) return <span key={i}>{span.text}</span>;
    return (
      <TextLink key={i} href={span.href}>
        {span.text}
      </TextLink>
    );
  });
}
