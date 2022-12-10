import {Link} from 'react-router-dom';

export const RepositoryList = ({repositories, isLoading}) => {
  if (isLoading) return <div>Loading...</div>;

  if (!repositories || repositories?.length === 0) return <div>No Data</div>;

  const formatDate = date => new Date(date).toLocaleString();

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
        {repositories.map(({id, name, svn_url, stargazers_count, pushed_at, owner}) => (
          <tr key={id}>
            <td>
              <Link to={`details/${id}`} state={{owner: owner.login, name: name}}>
                {name}
              </Link>
            </td>
            <td>{stargazers_count}</td>
            <td>{formatDate(pushed_at)}</td>
            <td>
              <a href={svn_url} target='_blank' rel="noreferrer">
                Go To page
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
