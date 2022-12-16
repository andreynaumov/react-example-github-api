import {Link} from 'react-router-dom';
import {RepositoryInfo} from '../shared/types/repository-info';

export const RepositoryList = ({
  repositories,
  isLoading,
}: {
  repositories: RepositoryInfo[];
  isLoading: boolean;
}) => {
  if (isLoading) return <span>Loading...</span>;

  if (!repositories || repositories?.length === 0) return <span>No Data</span>;

  const formatDate = (date: Date) => date.toLocaleString();

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Stars</th>
          <th>Last Commit Date</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {repositories.map(
          ({id, name, linkToGithubHomePage, starsCount, lastCommitDate, ownerName}) => (
            <tr key={id}>
              <td>
                <Link to={`details/${id}`} state={{owner: ownerName, name}}>
                  {name}
                </Link>
              </td>
              <td>{starsCount}</td>
              <td>{formatDate(lastCommitDate)}</td>
              <td>
                <a href={linkToGithubHomePage} target='_blank' rel='noreferrer'>
                  Go To page
                </a>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};
