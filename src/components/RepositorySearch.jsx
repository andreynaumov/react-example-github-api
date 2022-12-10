import {useEffect, useRef, useState} from 'react';
import {RepositoryList} from './RepositoryList.jsx';
import {SearchInput} from './SearchInput.jsx';
import {Pagination} from './Pagination.jsx';
import '../app.css';
import {getRepos} from '../shared/api.js';

export const RepositorySearch = () => {
  const [repositories, setRepositories] = useState([]);
  const [paramsState, setParamsState] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => {
    const paramsFromLocaleStorage = JSON.parse(localStorage.getItem('paramsState'));

    setParamsState({
      search: paramsFromLocaleStorage?.search ?? '',
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
        search: paramsState.search,
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

  const fetchRepos = async ({search: searchValue, currentPage}) => {
    setIsFetching(true);

    const data = await getRepos({searchValue, currentPage});

    setRepositories(data.items);
    setIsFetching(false);
  };

  const updateSearchValue = searchValue => {
    setParamsState({
      search: searchValue.trim(),
      currentPage: '1',
      isDebounce: true,
    });
  };

  const updateCurrentPage = currentPage => {
    setParamsState(({search}) => ({
      search: search,
      currentPage,
      isDebounce: false,
    }));
  };

  return (
    <>
      <SearchInput searchValue={paramsState?.search ?? ''} onSearch={updateSearchValue} />

      <RepositoryList repositories={repositories} isLoading={isFetching} />

      <Pagination currentPage={paramsState?.currentPage} updateCurrentPage={updateCurrentPage} />
    </>
  );
};
