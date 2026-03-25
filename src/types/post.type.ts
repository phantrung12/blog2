import { ICategory } from "./category.type";
import { IPaginationParams } from "./filter-params.type";
import { ITag } from "./tag.type";
import { IUser } from "./user.type";

export interface IPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: PostStatus;
  cover_image_url: string;
  reading_time_minutes: number;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  author_id: string;
  category_id: string;
  author: IUser;
  categories: ICategory;
  tags: ITag[];
  created_at: string;
  updated_at: string;
  published_at: string;
}

export interface IPostCreate {
  id?: string;
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  status?: PostStatus;
  categoryId?: string;
  tagIds?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface PostFilterParams extends IPaginationParams {
  search?: string;
  status?: PostStatus;
  categoryId?: string;
  categorySlug?: string;
  tagId?: string;
  tagSlug?: string;
}

export enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}
