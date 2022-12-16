import {useEffect, useRef, useState} from 'react';
import {RepositoryList} from './RepositoryList.jsx';
import {SearchInput} from './SearchInput.jsx';
import {Pagination} from './Pagination.jsx';
import {getRepos} from '../shared/api.js';
import {ViewOptions} from '../shared/types/view-options.js';
import {RepositoryInfo} from '../shared/types/repository-info.js';
import {createRepositoryQueryParams} from '../shared/mappers/create-repository-query-params.js';
import {createRepositoryInfo} from '../shared/mappers/create-repository-info.js';

export const RepositorySearch = () => {
  const [repositories, setRepositories] = useState<RepositoryInfo[]>([]);
  const [paramsState, setParamsState] = useState<(ViewOptions & {isDebounce: boolean}) | null>(
    null
  );
  const [isFetching, setIsFetching] = useState(false);

  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const paramsFromLocaleStorage = JSON.parse(localStorage.getItem('paramsState') ?? '');

    setParamsState({
      searchValue: paramsFromLocaleStorage?.searchValue ?? '',
      currentPage: paramsFromLocaleStorage?.currentPage ?? '1',
      isDebounce: false,
    });
  }, []);

  useEffect(() => {
    if (!paramsState) {
      return;
    }

    localStorage.setItem(
      'paramsState',
      JSON.stringify({
        searchValue: paramsState.searchValue,
        currentPage: paramsState.currentPage,
      })
    );

    if (paramsState.isDebounce) {
      if (timeoutRef) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        fetchRepos(paramsState);
      }, 2000);
    } else {
      fetchRepos(paramsState);
    }
  }, [paramsState]);

  const fetchRepos = async ({searchValue, currentPage}: ViewOptions) => {
    setIsFetching(true);

    const queryParams = createRepositoryQueryParams({searchValue, currentPage});
    const data = await getRepos(queryParams);

    setRepositories(data.items.map(i => createRepositoryInfo(i)));
    setIsFetching(false);
  };

  const updateSearchValue = (searchValue: string) => {
    setParamsState({
      searchValue: searchValue.trim(),
      currentPage: '1',
      isDebounce: true,
    });
  };

  const updateCurrentPage = (currentPage: string) => {
    setParamsState(params => ({
      searchValue: params?.searchValue.trim() ?? '',
      currentPage,
      isDebounce: false,
    }));
  };

  return (
    <>
      <SearchInput searchValue={paramsState?.searchValue ?? ''} onSearch={updateSearchValue} />

      <RepositoryList repositories={repositories} isLoading={isFetching} />

      <Pagination
        currentPage={paramsState?.currentPage ?? ''}
        updateCurrentPage={updateCurrentPage}
      />
    </>
  );
};
