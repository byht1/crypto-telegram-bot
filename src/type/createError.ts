export interface INewError extends Error {
  status?: number;
}

export type TCreateError = (message?: string, status?: number) => INewError;
