import {RepositorySearchQueryParams} from '../dto/repository-search-query-params';
import {ViewOptions} from '../types/view-options';

export const createRepositoryQueryParams = ({
  searchValue,
  currentPage,
}: ViewOptions): RepositorySearchQueryParams => {
  return {
    q: searchValue ? `${searchValue} in:name` : 'stars:>1',
    sort: 'stars',
    order: 'desc',
    per_page: '10',
    page: currentPage ?? '1',
  };
};
