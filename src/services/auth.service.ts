import apiClient from "@/lib/client";
import { AuthResponse, LoginParams, RegisterParams } from "@/types/auth.type";
import { IResponse } from "@/types/response.type";
import { IUser } from "@/types/user.type";
import { AxiosResponse } from "axios";

export const authService = {
  async login(
    params: LoginParams,
  ): Promise<AxiosResponse<IResponse<AuthResponse>>> {
    const response = await apiClient.post(`/auth/login`, params);
    return response;
  },
  async register(
    params: RegisterParams,
  ): Promise<AxiosResponse<IResponse<AuthResponse>>> {
    const response = await apiClient.post(`/auth/register`, params);
    return response;
  },
  async getMe(): Promise<AxiosResponse<IResponse<IUser>>> {
    const response = await apiClient.get(`/auth/me`);
    return response;
  },
};
