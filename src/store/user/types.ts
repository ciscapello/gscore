export interface UpdateUserData {
  username: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
