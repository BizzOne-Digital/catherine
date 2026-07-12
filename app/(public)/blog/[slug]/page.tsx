import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailView from "@/components/blog/BlogDetailView";
import { getAllBlogSlugs, getBlogPost, getRelatedPosts } from "@/lib/get-blog-post";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) {
    return { title: "Post Not Found | Lumina Medi Spa" };
  }
  return {
    title: `${post.title} | Lumina Medi Spa`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  const related = await getRelatedPosts(params.slug, post.category);

  return <BlogDetailView post={post} related={related} />;
}
