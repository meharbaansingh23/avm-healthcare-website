import JsonLd from "./JsonLd";
import { BASE_URL, ORG_ID } from "./OrganizationSchema";
import type { BlogPost } from "@/lib/blog";

export default function BlogPostingSchema({ post }: { post: BlogPost }) {
  const url = `${BASE_URL}/blog/${post.slug}`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.metaTitle ?? post.title,
        description: post.metaDescription ?? post.excerpt,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: post.image
          ? `${BASE_URL}${post.image}`
          : `${BASE_URL}/opengraph-image.png`,
        datePublished: post.datePublished,
        dateModified: post.dateModified ?? post.datePublished,
        // Author defaults to the organisation. If Anil agrees to a named
        // byline, swap this for a Person object — Google weighs named,
        // credentialled authors more heavily in health-adjacent categories.
        author: post.author
          ? { "@type": "Person", name: post.author }
          : { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        articleSection: post.category,
        keywords: post.keywords?.join(", "),
        inLanguage: "en-IN",
        isAccessibleForFree: true,
      }}
    />
  );
}
