/**
 * Renders a JSON-LD block. Server component — no client JS shipped.
 *
 * We deliberately use a plain <script> rather than next/script: structured data
 * must be present in the initial HTML for crawlers, and next/script defers by
 * default. The `\u003c` replacement prevents a "</script>" sequence inside any
 * string value from terminating the tag early.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
