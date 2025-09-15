export type PaginationType<T> = {
  data: T[];
  limit: number;
  page: number;
  totalPages: number;
};
