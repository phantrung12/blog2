"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCategories } from "@/hooks/use-categories";
import { usePosts } from "@/hooks/use-posts";
import { useTags } from "@/hooks/use-tags";
import { IPost, PostStatus } from "@/types/post.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select as AntSelect } from "antd";
import {
  ArrowLeft,
  Save,
  Send,
  Archive,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import slugify from "slugify";
import * as yup from "yup";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";
import dynamic from "next/dynamic";

const CKEditorCustom = dynamic(() => import("../custom-editor/custom-editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface PostFormProps {
  post?: IPost;
  mode: "create" | "edit";
}

const schema = yup.object({
  title: yup.string().required("Title is required"),
  slug: yup.string().required("Slug is required"),
  // excerpt: yup.string().required("Excerpt is required"),
  coverImageUrl: yup.string().nullable(),
  content: yup.string().required("Content is required"),
  tagIds: yup.array().nullable(),
  categoryId: yup.number().nullable(),
  // isPublished: yup.boolean().required("Published is required"),
});

export function PostForm({ post, mode }: PostFormProps) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });
  console.log("errors", errors);

  const { createPost, updatePost } = usePosts();
  const currentStatus = post?.status;

  //hook query para obtener tags
  const { data: tags } = useTags({ enabledList: true });
  const { data: categories } = useCategories({ enabledList: true });

  React.useEffect(() => {
    if (mode === "edit" && post) {
      reset({
        title: post.title,
        slug: post.slug,
        coverImageUrl: post.coverImageUrl,
        content: post.content,
        tagIds: post.tags?.map((tag) => tag.id),
        categoryId: post.categoryId,
      });
    }
  }, [mode, post]);

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    if (mode === "create") {
      setValue("slug", slugify(value));
    }
  };

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
    };

    if (post) {
      await updatePost.mutateAsync({ id: post.id, ...payload });
    } else {
      await createPost.mutateAsync(payload);
    }
  };

  const handleSave = (status: PostStatus) => {
    setValue("status", status);
    handleSubmit(onSubmit)();
  };

  const isMutating = createPost.isPending || updatePost.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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

        <div className="flex items-center gap-2">
          {/* Save / Update button */}
          <Button
            // type="submit"
            variant="outline"
            className="gap-2"
            disabled={isMutating}
            onClick={() => handleSave(PostStatus.DRAFT)}
          >
            {isMutating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {mode === "create" ? "Save Draft" : "Save"}
          </Button>

          {/* Publish button: shown for draft / archived / new posts */}
          {(mode === "create" ||
            currentStatus === PostStatus.DRAFT ||
            currentStatus === PostStatus.ARCHIVED) && (
            <Button
              type="button"
              className="gap-2"
              disabled={isMutating}
              onClick={() => handleSave(PostStatus.PUBLISHED)}
            >
              {currentStatus === PostStatus.ARCHIVED ? (
                <>
                  <RotateCcw className="h-4 w-4" />
                  Re-publish
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Publish
                </>
              )}
            </Button>
          )}

          {/* Archive button: shown for published posts */}
          {currentStatus === PostStatus.PUBLISHED && (
            <Button
              type="button"
              variant="destructive"
              className="gap-2"
              disabled={isMutating}
              onClick={() => handleSave(PostStatus.ARCHIVED)}
            >
              <Archive className="h-4 w-4" />
              Archive
            </Button>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Title */}
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleTitleChange(e.target.value);
                }}
                id="title"
                placeholder="Enter your post title..."
                required
                className="text-lg"
              />
            </div>
          )}
        />

        {/* Slug */}
        <Controller
          name="slug"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">/posts/</span>
                <Input
                  {...field}
                  id="slug"
                  placeholder="url-slug"
                  className="flex-1"
                />
              </div>
            </div>
          )}
        />

        {/* Cover Image */}
        <Controller
          name="coverImageUrl"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                {...field}
                id="coverImage"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
              {field.value && (
                <div className="mt-2 aspect-video w-full max-w-md overflow-hidden rounded-lg border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={field.value}
                    alt="Cover preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          )}
        />

        {/* Excerpt */}
        {/* <div className="space-y-2">
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
        </div> */}

        {/* Content */}
        <div className="space-y-2">
          <Label htmlFor="content">Content *</Label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              // <SimpleEditor value={field.value} onChange={field.onChange} />
              <CKEditorCustom value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        {/* <div className="space-y-2">
          <CKEditorCustom />
        </div> */}

        {/* Categories */}
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <AntSelect
                {...field}
                style={{ width: "100%" }}
                placeholder="Category"
                options={categories?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </div>
          )}
        />

        {/* Tags */}
        <Controller
          name="tagIds"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <AntSelect
                {...field}
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Tags"
                options={tags?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </div>
          )}
        />
      </div>
    </form>
  );
}
