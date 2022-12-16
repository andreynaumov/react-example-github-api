import {RepositoryContributorDto} from '../dto/repository-contributor-dto';
import {RepositoryDetailsDto} from '../dto/repository-details-dto';
import {RepositoryLanguagesDto} from '../dto/repository-languages-dto';
import {RepositoryDetails} from '../types/repository-details';

export const createRepositoryDetails = (
  info: RepositoryDetailsDto,
  languages: RepositoryLanguagesDto,
  contributors: RepositoryContributorDto[]
): RepositoryDetails => {
  return {
    name: info.name,
    starsCount: Number(info.stargazers_count),
    lastCommitDate: new Date(info.updated_at),
    owner: {
      name: info.owner.login,
      avatarUrl: info.owner.avatar_url,
    },
    description: info.description,
    usedLanguages: Object.keys(languages),
    // TODO Add imutable method for sort array
    mostActiveContributors: contributors
      .sort((prev, curr) => curr.contributions - prev.contributions)
      .slice(0, 10)
      .map(({login}) => login),
  };
};
