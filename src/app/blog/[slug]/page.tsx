import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — AVM Insights`,
    description: post.excerpt,
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

  const paragraphs = post.content.split(/\n\n+/);

  return (
    <article className="bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/blog"
          className="text-sm text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1"
        >
          ← Back to insights
        </Link>

        <div className="relative w-full h-[250px] md:h-[400px] mt-8 rounded-xl overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        <p
          className="text-xs font-semibold text-blue-600 uppercase mt-12"
          style={{ letterSpacing: "0.15em" }}
        >
          {post.category}
        </p>

        <h1
          className="text-4xl font-bold text-[#0A1628] tracking-tight mt-4 leading-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-[#94A3B8] mt-3 pb-6 border-b border-[#E2E8F0]">
          <span>{post.date}</span>
          <span aria-hidden>·</span>
          <span>{post.readTime}</span>
        </div>

        <div className="mt-10">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-base text-[#64748B] leading-[1.85] mb-6"
            >
              {para}
            </p>
          ))}
        </div>

        <div className="bg-[#F5F5F3] rounded-2xl p-8 mt-16 text-center border border-[#E2E8F0]">
          <h3 className="text-xl font-bold text-[#0A1628] tracking-tight" style={{ letterSpacing: "-0.03em" }}>
            Interested in our surgical instruments?
          </h3>
          <p className="text-[#64748B] text-sm mt-2 leading-relaxed">
            Request our detailed catalogue — over 3,400 instruments across six
            specialties.
          </p>
          <Link
            href="/request-catalogue"
            className="bg-[#0A1628] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#0d1f38] transition-colors inline-block mt-4"
          >
            Request full catalogue →
          </Link>
        </div>
      </div>
    </article>
  );
}
