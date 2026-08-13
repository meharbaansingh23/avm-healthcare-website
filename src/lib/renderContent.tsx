import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/**
 * A deliberately small markdown subset for blog content.
 *
 * Supports: `## ` headings, `### ` subheadings, `- ` unordered lists,
 * `**bold**`, `*italic*`, and `[text](/path)` links. Everything else is a
 * paragraph. No dependency, no dangerouslySetInnerHTML, no sanitiser needed —
 * all content is authored in-repo.
 *
 * H2s matter here: they carry the target keywords and are a real part of how
 * these articles rank, so they must render as headings rather than as literal
 * "##" text.
 */

// --- inline formatting -----------------------------------------------------

const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(INLINE).map((chunk, i) => {
    const key = `${keyPrefix}-${i}`;
    if (!chunk) return null;

    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <strong key={key} className="font-semibold text-[#0A1628]">
          {chunk.slice(2, -2)}
        </strong>
      );
    }

    if (chunk.startsWith("*") && chunk.endsWith("*")) {
      return <em key={key}>{chunk.slice(1, -1)}</em>;
    }

    const link = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const isInternal = href.startsWith("/");
      return isInternal ? (
        <Link
          key={key}
          href={href}
          className="text-[#2563EB] underline underline-offset-4 hover:text-[#0A1628] transition-colors"
        >
          {label}
        </Link>
      ) : (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2563EB] underline underline-offset-4 hover:text-[#0A1628] transition-colors"
        >
          {label}
        </a>
      );
    }

    return <Fragment key={key}>{chunk}</Fragment>;
  });
}

// --- block formatting ------------------------------------------------------

export function renderContent(content: string): ReactNode[] {
  const blocks = content.trim().split(/\n\s*\n/);

  return blocks.map((raw, i) => {
    const block = raw.trim();
    const key = `b-${i}`;

    if (block.startsWith("### ")) {
      return (
        <h3
          key={key}
          className="mt-10 mb-3 text-xl font-semibold tracking-tight text-[#0A1628]"
        >
          {renderInline(block.slice(4), key)}
        </h3>
      );
    }

    if (block.startsWith("## ")) {
      return (
        <h2
          key={key}
          className="mt-14 mb-4 text-2xl font-semibold tracking-tight text-[#0A1628] sm:text-3xl"
        >
          {renderInline(block.slice(3), key)}
        </h2>
      );
    }

    // A block is a list only if every line in it is a list item.
    const lines = block.split("\n").map((l) => l.trim());
    if (lines.length > 0 && lines.every((l) => l.startsWith("- "))) {
      return (
        <ul
          key={key}
          className="my-6 space-y-2.5 pl-5 [&>li]:list-disc [&>li]:pl-1.5 [&>li]:marker:text-[#2563EB]"
        >
          {lines.map((line, j) => (
            <li key={`${key}-${j}`} className="leading-relaxed text-slate-700">
              {renderInline(line.slice(2), `${key}-${j}`)}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={key} className="mb-6 leading-relaxed text-slate-700">
        {renderInline(block, key)}
      </p>
    );
  });
}
