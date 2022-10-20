export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  username: string;
  token: string;
}
