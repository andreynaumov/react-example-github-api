export type RepositoryDto = Readonly<{
  id: string;
  name: string;
  svn_url: string;
  stargazers_count: string;
  pushed_at: string;
  owner: {
    login: string;
  };
}>;
