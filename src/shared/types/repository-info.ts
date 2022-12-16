export type RepositoryInfo = Readonly<{
  id: string;
  name: string;
  starsCount: number;
  lastCommitDate: Date;
  linkToGithubHomePage: string;
  ownerName: string;
}>;
