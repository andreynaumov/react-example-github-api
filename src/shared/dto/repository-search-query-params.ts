export type RepositorySearchQueryParams = Readonly<{
  q: string;
  sort: 'stars';
  order: 'desc' | 'asc';
  per_page: string;
  page: string;
}>;
