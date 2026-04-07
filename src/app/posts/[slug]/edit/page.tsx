import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PostForm } from "@/components/posts/post-form";
import { posts, getPostBySlug } from "@/lib/mock-data";
import { postService } from "@/services/post.service";

interface EditPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;
  const post = await postService.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container as="main" className="py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-tight">
          Edit Post
        </h1>
        <p className="mt-2 text-muted-foreground">
          Make changes to &ldquo;{post.data?.data?.title}&rdquo;
        </p>
      </div>

      <PostForm mode="edit" post={post?.data?.data} />
    </Container>
  );
}
