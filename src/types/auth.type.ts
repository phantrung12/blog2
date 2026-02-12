import { IUser } from "./user.type";

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  user: IUser;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  name: string;
}
