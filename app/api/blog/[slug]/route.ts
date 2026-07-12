import { NextRequest, NextResponse } from "next/server";
import { getBlogPost, getRelatedPosts } from "@/lib/get-blog-post";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getBlogPost(params.slug);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    const related = await getRelatedPosts(params.slug, post.category);
    return NextResponse.json({ post, related });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}
