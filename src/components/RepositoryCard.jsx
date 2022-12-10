import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {getRepoInfo, getRepoContributors, getRepoLanguages} from '../shared/api';

export const RepositoryCard = () => {
  const [repositoryInfo, setRepositoryInfo] = useState(null);
  const [repositoryLanguages, setRepositoryLanguages] = useState(null);
  const [contributors, setContributors] = useState(null);

  const location = useLocation();

  useEffect(() => {
    fetchRepository();
    fetchLanguages();
    fetchContributors();
  }, []);

  const fetchRepository = async () => {
    const data = await getRepoInfo({
      owner: location.state.owner,
      name: location.state.name,
    });

    setRepositoryInfo(data);
  };

  const fetchLanguages = async () => {
    const data = await getRepoLanguages({
      owner: location.state.owner,
      name: location.state.name,
    });

    setRepositoryLanguages(data);
  };

  const fetchContributors = async () => {
    const data = await getRepoContributors({
      owner: location.state.owner,
      name: location.state.name,
    });

    setContributors(data);
  };

  if (!repositoryInfo) return 'No data';

  return (
    <>
      <div className='card'>
        <div>Name</div>
        <div>{repositoryInfo.name}</div>
      </div>

      <div className='card'>
        <div>Total Stars</div>
        <div>{repositoryInfo.stargazers_count}</div>
      </div>

      <div className='card'>
        <div>Last commit date</div>
        <div>{repositoryInfo.updated_at}</div>
      </div>

      <div className='card'>
        <div>Owner Photo</div>
        <img src={repositoryInfo.owner.avatar_url} alt='avatar' />
      </div>

      <div className='card'>
        <div>Owner Name</div>
        <div>{repositoryInfo.owner.login}</div>
      </div>

      <div className='card'>
        <div>Languages</div>
        <div>
          <ul>
            {Object.keys(repositoryLanguages ?? {}).map((language, idx) => (
              <li key={idx}>{language}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className='card'>
        <div>Description</div>
        <div>{repositoryInfo.description}</div>
      </div>

      <div className='card'>
        <div>Activity members</div>
        <div>
          <ul>
            {contributors
              ?.sort((prev, curr) => curr.contributions - prev.contributions)
              .slice(0, 10)
              .map((contributor, idx) => (
                <li key={idx}>{contributor.login}</li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};
