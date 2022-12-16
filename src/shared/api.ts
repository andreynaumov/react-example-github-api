import {RepositoryContributorDto} from './dto/repository-contributor-dto';
import {RepositoryDetailsDto} from './dto/repository-details-dto';
import {RepositoryDto} from './dto/repository-dto';
import {RepositoryLanguagesDto} from './dto/repository-languages-dto';
import {RepositorySearchQueryParams} from './dto/repository-search-query-params';
import {RepositoryDetailsParams} from './types/repository-details-pamams';
import {paramsToQueryString} from './utils/params-to-query-string';

const fetchFromGithubApi = async <T>(paramsString: string): Promise<T> => {
  const response = await fetch('https://api.github.com' + paramsString);
  const data = await response.json();
  return data;
};

export const getRepos = async (queryParams: RepositorySearchQueryParams) => {
  const queryString = paramsToQueryString(queryParams);

  return fetchFromGithubApi<{items: RepositoryDto[]; total_count: number}>(
    `/search/repositories${queryString}`
  );
};

export const getRepoInfo = ({owner, name}: RepositoryDetailsParams) => {
  return fetchFromGithubApi<RepositoryDetailsDto>(`/repos/${owner}/${name}`);
};

export const getRepoLanguages = ({owner, name}: RepositoryDetailsParams) => {
  return fetchFromGithubApi<RepositoryLanguagesDto>(`/repos/${owner}/${name}/languages`);
};

export const getRepoContributors = ({owner, name}: RepositoryDetailsParams) => {
  return fetchFromGithubApi<RepositoryContributorDto[]>(`/repos/${owner}/${name}/contributors`);
};
