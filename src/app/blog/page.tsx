import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
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
        title="From Our Knowledge Base"
        subtitle="Insights on surgical instrument care, innovation, and best practices from AVM Healthcare."
      />

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((p, i) => (
              <FadeInWhenVisible key={p.slug} delay={i * 0.1} className="h-full">
                <Link
                  href={`/blog/${p.slug}`}
                  className="group h-full bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 flex flex-col"
                >
                  <div className="relative w-full h-44 md:h-60 overflow-hidden">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1 text-center">
                    <p
                      className="text-xs font-medium text-blue-600 uppercase"
                      style={{ letterSpacing: "0.15em" }}
                    >
                      {p.category}
                    </p>
                    <h2 className="text-xl font-bold text-[#0A1628] mt-2 leading-snug tracking-tight">
                      {p.title}
                    </h2>
                    <p className="text-sm text-[#475569] mt-2 leading-relaxed flex-1">
                      {p.excerpt}
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-4">
                      <span className="text-xs font-semibold text-blue-600 inline-flex items-center gap-1">
                        Read article →
                      </span>
                      <span className="text-[#E2E8F0]" aria-hidden>
                        ·
                      </span>
                      <span className="text-xs text-[#94A3B8]">{p.readTime}</span>
                    </div>
                  </div>
                </Link>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
