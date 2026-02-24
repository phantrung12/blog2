import apiClient from "@/lib/client";
import { ICategory, ICategoryCreate } from "@/types/category.type";
import { IResponse } from "@/types/response.type";
import { AxiosResponse } from "axios";

export const categoryService = {
  async getCategories(): Promise<AxiosResponse<IResponse<ICategory[]>>> {
    const response = await apiClient.get("/categories");
    return response;
  },

  async getCategoryById(
    id: string,
  ): Promise<AxiosResponse<IResponse<ICategory>>> {
    const response = await apiClient.get(`/categories/${id}`);
    return response;
  },

  async getCategoryBySlug(
    slug: string,
  ): Promise<AxiosResponse<IResponse<ICategory>>> {
    const response = await apiClient.get(`/categories/slug/${slug}`);
    return response;
  },

  async createCategory(
    data: ICategoryCreate,
  ): Promise<AxiosResponse<IResponse<ICategory>>> {
    const response = await apiClient.post("/categories", data);
    return response;
  },

  async updateCategory(
    id: string,
    data: ICategoryCreate,
  ): Promise<AxiosResponse<IResponse<ICategory>>> {
    const response = await apiClient.patch(`/categories/${id}`, data);
    return response;
  },

  async deleteCategory(
    id: string,
  ): Promise<AxiosResponse<IResponse<ICategory>>> {
    const response = await apiClient.delete(`/categories/${id}`);
    return response;
  },
};
