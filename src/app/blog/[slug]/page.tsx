import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog";
import { renderContent } from "@/lib/renderContent";
import BlogPostingSchema from "@/components/schema/BlogPostingSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

const BASE_URL = "https://avmhealthcare.com";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return {};

  const url = `${BASE_URL}/blog/${post.slug}`;
  const title = { absolute: post.metaTitle ?? `${post.title} | AVM Healthcare` };
  const description = post.metaDescription ?? post.excerpt;
  const image = post.image ?? "/opengraph-image.png";

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
      images: [{ url: `${BASE_URL}${image}`, width: 1200, height: 630 }],
      ...(post.datePublished && { publishedTime: post.datePublished }),
      ...(post.dateModified && { modifiedTime: post.dateModified }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}${image}`],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="bg-white">
      <BlogPostingSchema post={post} />
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
          <p
            className="text-xs font-medium text-blue-600 uppercase"
            style={{ letterSpacing: "0.2em" }}
          >
            {post.category}
          </p>
          <h1 className="display-heading text-[#0A1628] text-4xl md:text-6xl mt-4">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm text-[#94A3B8] mt-5">
            <span>{post.date}</span>
            <span aria-hidden>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="relative w-full h-[250px] md:h-[420px] mt-10 rounded-2xl overflow-hidden border border-[#E2E8F0]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Body — left-aligned for comfortable reading */}
        <div className="mt-12">
          {renderContent(post.content)}
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
