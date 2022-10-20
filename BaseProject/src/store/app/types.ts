export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserLoginResponse extends UserLoginRequest {
  token: string;
}
