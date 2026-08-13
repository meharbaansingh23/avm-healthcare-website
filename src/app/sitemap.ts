import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";

const BASE_URL = "https://avmhealthcare.com";

// Static routes, ordered by importance. `priority` is a weak signal to Google
// but costs nothing; `changeFrequency` is largely ignored and kept minimal.
const staticRoutes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1.0, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" },
  { path: "/request-catalogue", priority: 0.9, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/innovation", priority: 0.7, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/careers", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.datePublished ? new Date(post.datePublished) : now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
