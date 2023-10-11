export type InfinityPaginationType<T> = {
  hasNextPage: boolean;
  data: T[];
};
