export interface FluxStandardAction<Payload, Meta = Object, Type = string> {
  type: Type;
  payload: Payload;
  error?: boolean;
  meta?: Meta;
}

export interface AppError {
  message: string;
  stack: string;
}
