import { ICategory } from "./category.type";
import { IPaginationParams } from "./filter-params.type";
import { ITag } from "./tag.type";
import { IUser } from "./user.type";

export interface IPost {
  id: number;
  title: string;
  content: string;
  slug: string;
  status: PostStatus;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  categoryId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  coverImageUrl: string;
  readingTimeMinutes: number;
  author: IUser;
  categories: ICategory;
  tags: ITag[];
}

export interface IPostCreate {
  id?: string;
  title?: string;
  slug?: string;
  content?: string;
  coverImageUrl?: string;
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
  authorId?: string;
}

export enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}
