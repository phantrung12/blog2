import apiClient from "@/lib/client";
import { AuthResponse, LoginParams, RegisterParams } from "@/types/auth.type";
import { IResponse } from "@/types/response.type";
import { IUser } from "@/types/user.type";
import { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  async login(
    params: LoginParams,
  ): Promise<AxiosResponse<IResponse<AuthResponse>>> {
    const response = await apiClient.post(`${API_URL}/auth/login`, params);
    return response;
  },
  async register(
    params: RegisterParams,
  ): Promise<AxiosResponse<IResponse<AuthResponse>>> {
    const response = await apiClient.post(`${API_URL}/auth/register`, params);
    return response;
  },
  async getMe(): Promise<AxiosResponse<IResponse<IUser>>> {
    const response = await apiClient.get(`${API_URL}/auth/me`);
    return response;
  },
};
