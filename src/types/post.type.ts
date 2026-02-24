import { ICategory } from "./category.type";
import { IPaginationParams } from "./filter-params.type";
import { ITag } from "./tag.type";
import { IUser } from "./user.type";

export interface IPost {
  id?: string;
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  thumbnail?: string;
  readingTime?: string;
  status?: PostStatus;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  author?: IUser;
  categories?: ICategory[];
  tags?: ITag[];
  createdAt?: string;
  updatedAt?: string;
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
}
