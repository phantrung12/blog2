import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IPost } from "@/types/post.type";
import { formatDate } from "@/lib/mock-data";

interface PostCardProps {
  post: IPost;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl cursor-pointer",
        "aspect-5/4 sm:aspect-5/3",
        className,
      )}
    >
      {/* Background Image */}
      {post.thumbnail ? (
        <Image
          src={post.thumbnail}
          alt={post.title || ""}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="h-full w-full bg-linear-to-br from-zinc-700 to-zinc-900" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {/* Meta */}
        <div className="mb-2 flex items-center gap-3 text-xs text-white/70">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt || "")}
          </time>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime || 5} min
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 font-serif text-lg font-semibold leading-snug text-white transition-colors group-hover:text-emerald-400 sm:text-xl">
          {post.title}
        </h3>

        {/* Excerpt - visible on hover */}
        <p className="mb-3 line-clamp-2 text-sm text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {post.tags?.slice(0, 2).map((tag) => (
            <Badge
              key={tag?.id}
              variant="secondary"
              className="bg-white/20 text-xs text-white hover:bg-white/30"
            >
              {tag?.name}
            </Badge>
          ))}
          {post?.tags && post?.tags?.length > 2 && (
            <Badge
              variant="secondary"
              className="bg-white/20 text-xs text-white hover:bg-white/30"
            >
              +{post?.tags?.length - 2}
            </Badge>
          )}
        </div>
      </div>

      {/* Clickable Overlay */}
      <Link href={`/posts/${post.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read {post.title}</span>
      </Link>
    </article>
  );
}
