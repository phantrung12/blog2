import { IPaginationParams } from "./filter-params.type";

export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  avatarUrl?: string;
  bio?: string;
  websiteUrl?: string;
  jobTitle?: string;
  createdAt: string;
  updatedAt: string;
}

export type IUserCreate = Omit<IUser, "id" | "createdAt" | "updatedAt">;

export type IUserUpdate = Partial<IUserCreate>;

export interface IFilterUser extends IPaginationParams {
  search?: string;
}
