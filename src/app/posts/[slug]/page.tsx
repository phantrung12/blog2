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
import { author } from "@/lib/mock-data";
import { postService } from "@/services/post.service";
import { convertDateDMY } from "@/utils/date-utils";
import "@/styles/tiptap-content.scss";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export const revalidate = 60;

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const { data: postDetail } = await postService.getPostBySlug(slug);

  if (!postDetail) {
    notFound();
  }

  return (
    <Container as="article" className="max-w-5xl py-12">
      {/* Back Link */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to posts
      </Link>

      {/* Cover Image */}
      {postDetail?.data?.coverImageUrl && (
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={postDetail?.data?.coverImageUrl}
            alt={postDetail?.data?.title || ""}
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
          <time dateTime={postDetail?.data?.publishedAt}>
            {convertDateDMY(postDetail?.data?.publishedAt || "")}
          </time>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {postDetail?.data?.readingTimeMinutes} min read
          </span>
          <Button variant="ghost" size="sm" className="ml-auto gap-2" asChild>
            <Link href={`/posts/${postDetail?.data?.slug}/edit`}>
              <Edit className="h-3.5 w-3.5" />
              Edit
            </Link>
          </Button>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          {postDetail?.data?.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {postDetail?.data?.tags?.map((tag) => (
            <Badge key={tag?.id} variant="secondary">
              {tag?.name}
            </Badge>
          ))}
        </div>
      </header>

      <Separator className="mb-8" />

      {/* Content */}
      {/* <PostContent content={postDetail?.data?.content || ""} /> */}
      <div
        className="tiptap-content max-w-none"
        dangerouslySetInnerHTML={{ __html: postDetail?.data?.content || "" }}
      ></div>

      <Separator className="my-12" />

      {/* Author Card */}
      <footer className="rounded-xl border border-border/40 bg-muted/30 p-6">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <Avatar className="h-16 w-16 border-2 border-border">
            <AvatarImage
              src={author.avatar}
              alt={postDetail?.data?.author?.name}
            />
            <AvatarFallback className="text-xl">
              {postDetail?.data?.author?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Written by</p>
            <h3 className="text-lg font-semibold">
              {postDetail?.data?.author?.name}
            </h3>
            <p className="max-w-md text-sm text-muted-foreground">
              {author.bio}
            </p>
          </div>
        </div>
      </footer>
    </Container>
  );
}
