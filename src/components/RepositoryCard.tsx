import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {getRepoInfo, getRepoContributors, getRepoLanguages} from '../shared/api';
import {createRepositoryDetails} from '../shared/mappers/create-repository-details';
import {RepositoryDetails} from '../shared/types/repository-details';
import {RepositoryDetailsParams} from '../shared/types/repository-details-pamams';

export const RepositoryCard = () => {
  const [repositoryDetails, setRepositoryDetails] = useState<RepositoryDetails | null>(null);

  const location = useLocation();

  useEffect(() => {
    fetchRepoDetails();
  }, []);

  const fetchRepoDetails = async () => {
    const params: RepositoryDetailsParams = {
      owner: location.state.owner,
      name: location.state.name,
    };

    const [info, languages, contributors] = await Promise.all([
      getRepoInfo(params),
      getRepoLanguages(params),
      getRepoContributors(params),
    ]);

    const data = createRepositoryDetails(info, languages, contributors);

    setRepositoryDetails(data);
  };

  if (!repositoryDetails) return <span>No data</span>;

  return (
    <>
      <div className='card'>
        <div>Name</div>
        <div>{repositoryDetails.name}</div>
      </div>

      <div className='card'>
        <div>Total Stars</div>
        <div>{repositoryDetails.starsCount}</div>
      </div>

      <div className='card'>
        <div>Last commit date</div>
        <div>{repositoryDetails.lastCommitDate.toString()}</div>
      </div>

      <div className='card'>
        <div>Owner Photo</div>
        <img src={repositoryDetails.owner.avatarUrl} alt='avatar' />
      </div>

      <div className='card'>
        <div>Owner Name</div>
        <div>{repositoryDetails.owner.name}</div>
      </div>

      <div className='card'>
        <div>Languages</div>
        <div>
          <ul>
            {repositoryDetails.usedLanguages.map((language, idx) => (
              <li key={idx}>{language}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className='card'>
        <div>Description</div>
        <div>{repositoryDetails.description}</div>
      </div>

      <div className='card'>
        <div>Activity members</div>
        <div>
          <ul>
            {repositoryDetails.mostActiveContributors.map((contributor, idx) => (
              <li key={idx}>{contributor}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
