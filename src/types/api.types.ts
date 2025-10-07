export interface IApiResponse<T> {
  status: number;
  errorMessage: string;
  data: T | null;
}

export enum LoadingStatusesEnum {
  notLoaded = 'notLoaded',
  loading = 'loading',
  error = 'error',
  loaded = 'loaded',
}

