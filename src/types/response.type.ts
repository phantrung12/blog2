export interface IResponse<T> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}
