import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import {
  BlogPost as BlogPostType,
  getFallbackPostBySlug,
  getFallbackRelatedPosts,
  fallbackBlogPosts,
} from "@/lib/blog-fallbacks";

function serializePost(post: Record<string, unknown>): BlogPostType {
  return {
    _id: String(post._id),
    title: String(post.title),
    slug: String(post.slug),
    category: String(post.category),
    excerpt: String(post.excerpt),
    content: String(post.content),
    featuredImage: String(post.featuredImage || ""),
    publishedAt: post.publishedAt ? new Date(post.publishedAt as string).toISOString() : undefined,
    createdAt: new Date(post.createdAt as string).toISOString(),
  };
}

export async function getBlogPost(slug: string): Promise<BlogPostType | null> {
  try {
    await connectDB();
    const post = await BlogPost.findOne({ slug, status: "published" }).lean();
    if (post) return serializePost(post as Record<string, unknown>);
  } catch (err) {
    console.error("getBlogPost:", err);
  }
  return getFallbackPostBySlug(slug);
}

export async function getRelatedPosts(
  slug: string,
  category: string,
  limit = 3
): Promise<BlogPostType[]> {
  try {
    await connectDB();
    const posts = await BlogPost.find({
      slug: { $ne: slug },
      category,
      status: "published",
    })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();

    if (posts.length) {
      return posts.map((post) => serializePost(post as Record<string, unknown>));
    }
  } catch (err) {
    console.error("getRelatedPosts:", err);
  }
  return getFallbackRelatedPosts(slug, category, limit);
}

export function getAllBlogSlugs(): string[] {
  return fallbackBlogPosts.map((post) => post.slug);
}
