export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: any;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface ICreateUserRequest {
  name: string,
  email: string
}