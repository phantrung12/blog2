import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Post, formatDate } from "@/lib/mock-data";

interface FeaturedPostProps {
  post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl">
      {/* Background Image */}
      <div className="relative aspect-21/9 w-full sm:aspect-2/1 lg:aspect-3/1">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
        {/* Featured Badge */}
        <Badge className="mb-4 w-fit bg-emerald-600 text-white hover:bg-emerald-700">
          Featured
        </Badge>

        {/* Meta */}
        <div className="mb-3 flex items-center gap-3 text-sm text-white/80">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime} min read
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-3 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-2 max-w-2xl text-white/80 sm:text-lg">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-white/20 text-white hover:bg-white/30"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Read More Link */}
        <Link
          href={`/posts/${post.slug}`}
          className="inline-flex w-fit items-center gap-2 font-medium text-white transition-colors hover:text-emerald-400"
        >
          Read article
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Clickable Overlay */}
      <Link href={`/posts/${post.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read {post.title}</span>
      </Link>
    </article>
  );
}
