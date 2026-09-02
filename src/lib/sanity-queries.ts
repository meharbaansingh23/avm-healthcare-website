import type { PortableTextBlock } from "@portabletext/react";
import { sanityClient } from "@/lib/sanity-client";

export type SanityImage = {
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
};

export type BlogPostListItem = {
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: SanityImage | null;
  publishedAt: string | null;
};

export type BlogPostFull = BlogPostListItem & {
  body: PortableTextBlock[];
  seoTitle: string | null;
  seoDescription: string | null;
};

export type Faq = {
  question: string;
  answer: string;
  order: number | null;
};

/** All published blog posts, newest first — listing-page fields only. */
export async function getAllBlogPosts(): Promise<BlogPostListItem[]> {
  return sanityClient.fetch(
    `*[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      publishedAt
    }`,
  );
}

/** One full blog post by slug, including body and SEO overrides. */
export async function getBlogPostBySlug(slug: string): Promise<BlogPostFull | null> {
  return sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      publishedAt,
      body,
      seoTitle,
      seoDescription
    }`,
    { slug },
  );
}

/** All FAQs in their configured display order. */
export async function getAllFaqs(): Promise<Faq[]> {
  return sanityClient.fetch(
    `*[_type == "faq"] | order(order asc) {
      question,
      answer,
      order
    }`,
  );
}
