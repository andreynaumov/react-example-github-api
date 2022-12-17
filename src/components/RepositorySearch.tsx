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

    updateLocalStorage(paramsState);
    fetchRepos(paramsState);
  }, [paramsState]);

  const updateLocalStorage = ({searchValue, currentPage}: ViewOptions) => {
    localStorage.setItem('paramsState', JSON.stringify({searchValue, currentPage}));
  };

  const fetchRepos = async ({searchValue, currentPage}: ViewOptions) => {
    setIsFetching(true);

    const queryParams = createRepositoryQueryParams({searchValue, currentPage});
    const data = await getRepos(queryParams);

    setRepositories(data.items.map(i => createRepositoryInfo(i)));
    setIsFetching(false);
  };

  const updateSearchValue = (searchValue: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(
      () =>
        setParamsState({
          searchValue: searchValue.trim(),
          currentPage: '1',
          isDebounce: false,
        }),
      1000
    );
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
