import Main from './pages/Main/Main';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './Layouts/MainLayout/MainLayout';
import NotFound from './pages/NotFound';
import { Routespages } from './pages/Routespages/Routespages';
import { Events } from './pages/Events/Events';
import { EventFullPage } from './pages/EventFullPage/EventFullPage';
import { LocationFullPage } from './pages/LocationFullPage/LocationFullPage';
import { Locations } from './pages/Locations/Locations';

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
          <Route path='routespages/:id' element={<Routespages />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
