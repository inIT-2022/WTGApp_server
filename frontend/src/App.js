import { Route, Routes } from 'react-router-dom';

import Main from './pages/Main/Main';
import MainLayout from './Layouts/MainLayout';
import NotFound from './pages/NotFound';
import RouteFullPage from './pages/RouteFullPage';
import Events from './pages/Events';
import EventFullPage from './pages/EventFullPage';
import LocationFullPage from './pages/LocationFullPage';
import Locations from './pages/Locations';
import RoutesPage from './pages/RoutesPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Main />} />
          <Route path='events' element={<Events />} />
          <Route path='events/:id' element={<EventFullPage />} />
          <Route path='locations' element={<Locations />} />
          <Route path='locations/:id' element={<LocationFullPage />} />
          <Route path='routes' element={<RoutesPage />} />
          <Route path='routes/:type/:category' element={<RouteFullPage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
