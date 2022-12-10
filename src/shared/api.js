import {paramsToQueryString} from './utils/params-to-query-string';

const fetchFromGithubApi = async paramsString => {
  const response = await fetch('https://api.github.com' + paramsString);
  const data = await response.json();
  return data;
};

export const getRepos = async ({searchValue, currentPage}) => {
  const queryParams = {
    q: searchValue ? `${searchValue} in:name` : 'stars:>1',
    sort: 'stars',
    order: 'desc',
    per_page: '10',
    page: currentPage ?? '1',
  };

  const queryString = paramsToQueryString(queryParams);

  return fetchFromGithubApi(`/search/repositories${queryString}`);
};

export const getRepoInfo = ({owner, name}) => {
  return fetchFromGithubApi(`/repos/${owner}/${name}`);
};

export const getRepoLanguages = ({owner, name}) => {
  return fetchFromGithubApi(`/repos/${owner}/${name}/languages`);
};

export const getRepoContributors = ({owner, name}) => {
  return fetchFromGithubApi(`/repos/${owner}/${name}/contributors`);
};
