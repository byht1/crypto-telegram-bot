import { INewError, TCreateError } from "type";

export const createError: TCreateError = (
  message = "Server error",
  status = 500
) => {
  const error: INewError = new Error(message);
  error.status = status;

  return error;
};
