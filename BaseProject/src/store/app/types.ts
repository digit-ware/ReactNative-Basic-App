export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  username: string;
  token: string;
}

export interface UserSigninRequest {
  username: string;
  password: string;
}

export interface UserSigninResponse {
  username: string;
}

export interface RememberMe {
  rememberMe: boolean;
}
