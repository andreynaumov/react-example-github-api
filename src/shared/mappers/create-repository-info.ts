import {RepositoryDto} from '../dto/repository-dto';
import {RepositoryInfo} from '../types/repository-info';

export const createRepositoryInfo = (dto: RepositoryDto): RepositoryInfo => {
  return {
    id: dto.id,
    name: dto.name,
    starsCount: Number(dto.stargazers_count),
    lastCommitDate: new Date(dto.pushed_at),
    linkToGithubHomePage: dto.svn_url,
    ownerName: dto.owner.login,
  };
};
