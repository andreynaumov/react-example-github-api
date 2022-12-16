export type RepositoryDetailsDto = Readonly<{
  name: string;
  stargazers_count: string;
  updated_at: string;
  description: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}>;
