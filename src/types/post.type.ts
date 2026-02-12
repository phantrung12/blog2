import { ICategory } from "./category.type";
import { ITag } from "./tag.type";
import { IUser } from "./user.type";

export interface IPost {
  id?: string;
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  status?: "draft" | "published";
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
