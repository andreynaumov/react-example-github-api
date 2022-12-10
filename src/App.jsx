import {useRoutes} from 'react-router-dom';
import {RepositorySearch} from './components/RepositorySearch';
import {RepositoryCard} from './components/RepositoryCard';

export const App = () => {
  let element = useRoutes([
    {path: '/', element: <RepositorySearch />},
    {path: 'details/:id', element: <RepositoryCard />},
  ]);

  return element;
};
