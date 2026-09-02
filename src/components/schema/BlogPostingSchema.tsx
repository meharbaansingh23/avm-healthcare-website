import JsonLd from "./JsonLd";
import { BASE_URL, ORG_ID } from "./OrganizationSchema";
import type { BlogPostFull } from "@/lib/sanity-queries";

export default function BlogPostingSchema({
  post,
  imageUrl,
}: {
  post: Pick<BlogPostFull, "slug" | "title" | "excerpt" | "seoTitle" | "seoDescription" | "publishedAt">;
  imageUrl?: string | null;
}) {
  const url = `${BASE_URL}/blog/${post.slug}`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.seoTitle ?? post.title,
        description: post.seoDescription ?? post.excerpt,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: imageUrl ?? `${BASE_URL}/opengraph-image.png`,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        // Author defaults to the organisation. If Anil agrees to a named
        // byline, swap this for a Person object — Google weighs named,
        // credentialled authors more heavily in health-adjacent categories.
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        inLanguage: "en-IN",
        isAccessibleForFree: true,
      }}
    />
  );
}
