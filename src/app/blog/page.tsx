import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { blogPosts } from "@/lib/blog";

export const metadata = {
  title: "Insights — AVM Healthcare Products Pvt. Ltd.",
  description:
    "Insights on surgical instrument care, innovation, and best practices from AVM Healthcare.",
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        label="AVM Insights"
        title="From our knowledge base"
        subtitle="Insights on surgical instrument care, innovation, and best practices from AVM Healthcare."
      />

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all flex flex-col"
              >
                <div className="relative w-full h-44 md:h-60">
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-semibold text-blue-600 uppercase" style={{ letterSpacing: "0.15em" }}>
                    {p.category}
                  </p>
                  <h2 className="text-base font-semibold text-[#0A1628] mt-2 leading-snug">
                    {p.title}
                  </h2>
                  <p className="text-sm text-[#64748B] mt-2 leading-relaxed flex-1">
                    {p.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-semibold text-blue-600 inline-flex items-center gap-1 transition-all hover:gap-2">
                      Read article →
                    </span>
                    <span className="text-xs text-[#94A3B8]">
                      {p.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
