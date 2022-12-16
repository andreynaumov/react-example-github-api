export type SearchParams = Readonly<{
  searchValue: string;
}>;

export type PaginationParams = Readonly<{
  currentPage: string;
}>;

export type ViewOptions = SearchParams & PaginationParams;
