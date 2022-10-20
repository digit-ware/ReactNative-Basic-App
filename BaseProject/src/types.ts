export interface FluxStandardAction<Payload, Type = string> {
  type: Type;
  payload: Payload;
  error?: boolean;
  meta?: Object;
}

export interface AppError {
  message: string;
  stack: string;
}
