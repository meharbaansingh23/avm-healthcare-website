import JsonLd from "./JsonLd";
import { BASE_URL } from "./OrganizationSchema";

export type Crumb = {
  name: string;
  /** Path relative to the site root, e.g. "/blog" or "/blog/some-slug". */
  path: string;
};

/**
 * Usage — on /blog/[slug]:
 *
 *   <BreadcrumbSchema
 *     crumbs={[
 *       { name: "Blog", path: "/blog" },
 *       { name: post.title, path: `/blog/${post.slug}` },
 *     ]}
 *   />
 *
 * "Home" is prepended automatically, so never pass it in.
 */
export default function BreadcrumbSchema({ crumbs }: { crumbs: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: all.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: crumb.name,
          item: `${BASE_URL}${crumb.path === "/" ? "" : crumb.path}`,
        })),
      }}
    />
  );
}
