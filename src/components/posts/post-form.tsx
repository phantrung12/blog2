"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { type Post } from "@/lib/mock-data";

interface PostFormProps {
  post?: Post;
  mode: "create" | "edit";
}

export function PostForm({ post, mode }: PostFormProps) {
  const router = useRouter();
  const [isPublished, setIsPublished] = React.useState(true);
  const [title, setTitle] = React.useState(post?.title ?? "");
  const [slug, setSlug] = React.useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = React.useState(post?.excerpt ?? "");
  const [coverImage, setCoverImage] = React.useState(post?.coverImage ?? "");
  const [content, setContent] = React.useState(post?.content ?? "");
  const [tags, setTags] = React.useState(post?.tags.join(", ") ?? "");

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (mode === "create") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log({
      title,
      slug,
      excerpt,
      coverImage,
      content,
      tags: tags.split(",").map((t) => t.trim()),
      isPublished,
    });
    // Navigate back to the feed
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="published"
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
            <Label
              htmlFor="published"
              className="text-sm text-muted-foreground"
            >
              Publish
            </Label>
          </div>

          <Button type="button" variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>

          <Button type="submit" className="gap-2">
            <Save className="h-4 w-4" />
            {mode === "create" ? "Publish" : "Update"}
          </Button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            placeholder="Enter your post title..."
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="text-lg"
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug">URL Slug</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">/posts/</span>
            <Input
              id="slug"
              placeholder="url-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div className="space-y-2">
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input
            id="coverImage"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />
          {coverImage && (
            <div className="mt-2 aspect-video w-full max-w-md overflow-hidden rounded-lg border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImage}
                alt="Cover preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            placeholder="A brief summary of your post..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            This will appear in post previews and search results.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Label htmlFor="content">Content *</Label>
          <Textarea
            id="content"
            placeholder="Write your post content here... (Markdown supported)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            required
            className="font-mono text-sm"
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            placeholder="React, TypeScript, Web Development"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Separate tags with commas
          </p>
        </div>
      </div>
    </form>
  );
}
