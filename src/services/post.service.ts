import apiClient from "@/lib/client";
import { IPost, IPostCreate, PostFilterParams } from "@/types/post.type";
import { IResponse } from "@/types/response.type";
import { AxiosResponse } from "axios";
import { IPagination } from "@/types/pagination.type";
import queryString from "query-string";

export const postService = {
  async getPosts(
    params: PostFilterParams,
  ): Promise<AxiosResponse<IResponse<IPagination<IPost>>>> {
    const query = queryString.stringify(params, { skipEmptyString: true });

    const response = await apiClient.get(`/posts?${query}`);
    return response;
  },
  async createPost(
    data: IPostCreate,
  ): Promise<AxiosResponse<IResponse<IPost>>> {
    const response = await apiClient.post(`/posts`, data);
    return response;
  },
  async updatePost(
    id: string,
    data: IPostCreate,
  ): Promise<AxiosResponse<IResponse<IPost>>> {
    const response = await apiClient.patch(`/posts/${id}`, data);
    return response;
  },
  async getPostById(id: string): Promise<AxiosResponse<IResponse<IPost>>> {
    const response = await apiClient.get(`/posts/${id}`);
    return response;
  },
  async getPostBySlug(slug: string): Promise<AxiosResponse<IResponse<IPost>>> {
    const response = await apiClient.get(`/posts/slug/${slug}`);
    return response;
  },
  async deletePost(id: string): Promise<AxiosResponse<IResponse<IPost>>> {
    const response = await apiClient.delete(`/posts/${id}`);
    return response;
  },
};
