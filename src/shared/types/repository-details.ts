export type RepositoryDetails = Readonly<{
  name: string;
  starsCount: number;
  lastCommitDate: Date;
  owner: {
    name: string;
    avatarUrl: string;
  };
  description: string;
  usedLanguages: string[];
  mostActiveContributors: string[];
}>;
