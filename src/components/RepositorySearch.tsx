import {useEffect, useState} from 'react';
import {RepositoryList} from './RepositoryList.jsx';
import {SearchInput} from './SearchInput.jsx';
import {Pagination} from './Pagination.jsx';
import {getRepos} from '../shared/api.js';
import {ViewOptions} from '../shared/types/view-options.js';
import {RepositoryInfo} from '../shared/types/repository-info.js';
import {createRepositoryQueryParams} from '../shared/mappers/create-repository-query-params.js';
import {createRepositoryInfo} from '../shared/mappers/create-repository-info.js';
import {useDebounce} from '../shared/hooks/useDebounce.js';
import {useLocalStorage} from '../shared/hooks/useLocalStorage.js';

const viewOptionsInitialState: ViewOptions = {
  searchValue: '',
  currentPage: '1',
};

export const RepositorySearch = () => {
  const [repositories, setRepositories] = useState<RepositoryInfo[]>([]);
  const [paramsState, setParamsState] = useState<ViewOptions | null>(null);
  const [paramsLocalStorage, setParamsLocalStorage] = useLocalStorage<ViewOptions>('paramsState');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setParamsState(paramsLocalStorage ?? viewOptionsInitialState);
  }, []);

  useEffect(() => {
    if (!paramsState) {
      return;
    }

    setParamsLocalStorage(paramsState);
    fetchRepos(paramsState);
  }, [paramsState]);

  const fetchRepos = async ({searchValue, currentPage}: ViewOptions) => {
    setIsFetching(true);

    const queryParams = createRepositoryQueryParams({searchValue, currentPage});
    const data = await getRepos(queryParams);

    setRepositories(data.items.map(i => createRepositoryInfo(i)));
    setIsFetching(false);
  };

  const updateParamsStateWithDelay = useDebounce((searchValue: string) => {
    setParamsState({
      searchValue: searchValue.trim(),
      currentPage: viewOptionsInitialState.currentPage,
    });
  }, 1000);

  const handlePageChange = (currentPage: string) => {
    setParamsState(params => ({
      searchValue: params?.searchValue.trim() ?? viewOptionsInitialState.searchValue,
      currentPage,
    }));
  };

  return (
    <>
      <SearchInput
        searchValue={paramsState?.searchValue ?? viewOptionsInitialState.searchValue}
        onSearch={v => updateParamsStateWithDelay(v)}
      />

      <RepositoryList repositories={repositories} isLoading={isFetching} />

      <Pagination
        currentPage={paramsState?.currentPage ?? viewOptionsInitialState.currentPage}
        updateCurrentPage={handlePageChange}
      />
    </>
  );
};
