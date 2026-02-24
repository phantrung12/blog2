import apiClient from "@/lib/client";
import { ITag, ITagCreate } from "@/types/tag.type";
import { IResponse } from "@/types/response.type";
import { AxiosResponse } from "axios";

export const tagService = {
  async getTags(): Promise<AxiosResponse<IResponse<ITag[]>>> {
    const response = await apiClient.get("/tags");
    return response;
  },

  async getTagById(id: string): Promise<AxiosResponse<IResponse<ITag>>> {
    const response = await apiClient.get(`/tags/${id}`);
    return response;
  },

  async getTagBySlug(slug: string): Promise<AxiosResponse<IResponse<ITag>>> {
    const response = await apiClient.get(`/tags/slug/${slug}`);
    return response;
  },

  async createTag(data: ITagCreate): Promise<AxiosResponse<IResponse<ITag>>> {
    const response = await apiClient.post("/tags", data);
    return response;
  },

  async updateTag(
    id: string,
    data: ITagCreate,
  ): Promise<AxiosResponse<IResponse<ITag>>> {
    const response = await apiClient.patch(`/tags/${id}`, data);
    return response;
  },

  async deleteTag(id: string): Promise<AxiosResponse<IResponse<ITag>>> {
    const response = await apiClient.delete(`/tags/${id}`);
    return response;
  },
};
