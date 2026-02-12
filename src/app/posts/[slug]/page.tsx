import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Edit } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PostContent } from "@/components/posts/post-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { posts, author, getPostBySlug, formatDate } from "@/lib/mock-data";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container as="article" className="py-12">
      {/* Back Link */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to posts
      </Link>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-8 space-y-4">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime} min read
          </span>
          <Button variant="ghost" size="sm" className="ml-auto gap-2" asChild>
            <Link href={`/posts/${post.slug}/edit`}>
              <Edit className="h-3.5 w-3.5" />
              Edit
            </Link>
          </Button>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          {post.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <Separator className="mb-8" />

      {/* Content */}
      <PostContent content={post.content} />

      <Separator className="my-12" />

      {/* Author Card */}
      <footer className="rounded-xl border border-border/40 bg-muted/30 p-6">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <Avatar className="h-16 w-16 border-2 border-border">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="text-xl">
              {author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Written by</p>
            <h3 className="text-lg font-semibold">{author.name}</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              {author.bio}
            </p>
          </div>
        </div>
      </footer>
    </Container>
  );
}
