import apiClient from "@/lib/client";
import { IUser, IUserCreate, IUserUpdate } from "@/types/user.type";
import { IResponse } from "@/types/response.type";
import { AxiosResponse } from "axios";
import { IFilterUser } from "@/types/user.type";
import queryString from "query-string";

const prefix = "/users";

export const userService = {
  async getUsers(filter: IFilterUser): Promise<AxiosResponse<IResponse<IUser[]>>> {
    const query = queryString.stringify(filter, { skipEmptyString: true });
    const response = await apiClient.get(`${prefix}?${query}`);
    return response;
  },

  async getUserById(
    id: string,
  ): Promise<AxiosResponse<IResponse<IUser>>> {
    const response = await apiClient.get(`${prefix}/${id}`);
    return response;
  },

  async createUser(
    data: IUserCreate,
  ): Promise<AxiosResponse<IResponse<IUser>>> {
    const response = await apiClient.post(prefix, data);
    return response;
  },

  async updateUser(
    id: string,
    data: IUserUpdate,
  ): Promise<AxiosResponse<IResponse<IUser>>> {
    const response = await apiClient.patch(`${prefix}/${id}`, data);
    return response;
  },

  async deleteUser(
    id: string,
  ): Promise<AxiosResponse<IResponse<IUser>>> {
    const response = await apiClient.delete(`${prefix}/${id}`);
    return response;
  },
};
