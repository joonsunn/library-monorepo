export type Paginated<T> = {
  data: T[];
  meta: {
    page?: number;
    pageSize: number;
    totalRows: number;
    totalPages?: number;
    cursor?: string;
  };
};

export type PaginationQuery = {
  page?: number;
  pageSize: number;
  cursor?: string;
};
