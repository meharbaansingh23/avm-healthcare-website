import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/sanity-queries";
import { urlForImage } from "@/lib/sanity-image";
import BlogPostingSchema from "@/components/schema/BlogPostingSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

const BASE_URL = "https://avmhealthcare.com";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/** ~200 wpm, estimated from the portable text body's plain-text word count. */
function estimateReadTime(body: PortableTextBlock[]): string {
  const wordCount = body
    .filter((block) => block._type === "block")
    .flatMap((block) => (block.children ?? []).map((child) => child.text ?? ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.round(wordCount / 200))} min read`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) return {};

  const url = `${BASE_URL}/blog/${post.slug}`;
  const title = { absolute: post.seoTitle ?? `${post.title} | AVM Healthcare` };
  const description = post.seoDescription ?? post.excerpt ?? undefined;
  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage).width(1200).height(630).fit("crop").url()
    : `${BASE_URL}/opengraph-image.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "AVM Healthcare",
      locale: "en_IN",
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      ...(post.publishedAt && { publishedTime: post.publishedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const coverImageUrl = post.coverImage
    ? urlForImage(post.coverImage).width(1536).height(840).fit("crop").url()
    : null;
  const ogImageUrl = post.coverImage
    ? urlForImage(post.coverImage).width(1200).height(630).fit("crop").url()
    : null;
  const publishedLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;
  const readTime = estimateReadTime(post.body ?? []);

  return (
    <article className="bg-white">
      <BlogPostingSchema post={post} imageUrl={ogImageUrl} />
      <BreadcrumbSchema
        crumbs={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <Link
          href="/blog"
          className="text-sm text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1"
        >
          ← Back to insights
        </Link>

        {/* Centered header block */}
        <div className="text-center mt-10">
          <h1 className="display-heading text-[#0A1628] text-4xl md:text-6xl mt-4">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm text-[#94A3B8] mt-5">
            {publishedLabel && <span>{publishedLabel}</span>}
            {publishedLabel && <span aria-hidden>·</span>}
            <span>{readTime}</span>
          </div>
        </div>

        {coverImageUrl && (
          <div className="relative w-full h-[250px] md:h-[420px] mt-10 rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <Image
              src={coverImageUrl}
              alt={post.coverImage?.alt || post.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        )}

        {/* Body — left-aligned for comfortable reading */}
        <div className="mt-12 [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[#0A1628] [&_h2]:sm:text-3xl [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-[#0A1628] [&_p]:mb-6 [&_p]:leading-relaxed [&_p]:text-slate-700 [&_ul]:my-6 [&_ul]:space-y-2.5 [&_ul]:pl-5 [&_li]:list-disc [&_li]:pl-1.5 [&_li]:marker:text-[#2563EB] [&_li]:leading-relaxed [&_li]:text-slate-700 [&_a]:text-[#2563EB] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[#0A1628] [&_strong]:font-semibold [&_strong]:text-[#0A1628]">
          <PortableText value={post.body ?? []} />
        </div>

        <div className="bg-[#FAFAF9] rounded-2xl p-8 mt-16 text-center border border-[#E2E8F0]">
          <h3 className="display-heading text-[#0A1628] text-2xl md:text-3xl">
            Interested In Our Surgical Instruments?
          </h3>
          <p className="text-[#475569] text-sm mt-3 leading-relaxed max-w-md mx-auto">
            Request our detailed catalogue — over 3,400 instruments across six
            specialties.
          </p>
          <Link
            href="/request-catalogue"
            className="bg-[#0A1628] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#0d1f38] transition-colors inline-block mt-5"
          >
            Request full catalogue →
          </Link>
        </div>
      </div>
    </article>
  );
}
