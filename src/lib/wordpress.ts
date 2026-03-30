import { stripHtml } from "./html";
import type { ArticleData } from "../types/chat";
import type { Highlight } from "../types/highlight";

const WP_API_BASE =
  import.meta.env.VITE_WP_API_BASE || "https://mbg.nikici.com/wp-json/wp/v2/posts";

type WpPost = {
  slug?: string;
  link?: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
};

function mapWpPost(post: WpPost, fallbackTitle = "", fallbackDescription = ""): ArticleData {
  return {
    slug: post.slug || "",
    title: stripHtml(post.title?.rendered || fallbackTitle),
    excerpt: stripHtml(post.excerpt?.rendered || fallbackDescription),
    content: stripHtml(post.content?.rendered || fallbackDescription),
    link: post.link || "",
  };
}

export async function fetchArticleForHighlight(item: Highlight): Promise<ArticleData | null> {
  const slug = String(item.id).trim();

  const tryUrls = [
    `${WP_API_BASE}?slug=${encodeURIComponent(slug)}&_fields=slug,link,title,excerpt,content`,
    `${WP_API_BASE}?search=${encodeURIComponent(item.title)}&per_page=5&_fields=slug,link,title,excerpt,content`,
  ];

  for (const url of tryUrls) {
    const res = await fetch(url);
    if (!res.ok) continue;

    const posts: WpPost[] = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) continue;

    const exact =
      posts.find((p) => p.slug === slug) ||
      posts.find((p) =>
        stripHtml(p.title?.rendered || "")
          .toLowerCase()
          .includes(item.title.toLowerCase())
      ) ||
      posts[0];

    if (exact) {
      const mapped = mapWpPost(exact, item.title, item.description);

      if (!mapped.link) {
        const wpBase = import.meta.env.VITE_WP_BASE_URL || "https://mbg.nikici.com";
        mapped.link = `${wpBase}/${item.id}`;
      }

      return mapped;
    }
  }

  const wpBase = import.meta.env.VITE_WP_BASE_URL || "https://mbg.nikici.com";

  return {
    title: item.title,
    excerpt: item.description,
    content: item.description,
    link: `${wpBase}/${item.id}`,
    slug,
  };
}