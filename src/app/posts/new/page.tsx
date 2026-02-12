import { Container } from "@/components/layout/container";
import { PostForm } from "@/components/posts/post-form";

export default function CreatePostPage() {
  return (
    <Container as="main" className="py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-tight">
          Create New Post
        </h1>
        <p className="mt-2 text-muted-foreground">
          Write and publish a new blog post
        </p>
      </div>

      <PostForm mode="create" />
    </Container>
  );
}
