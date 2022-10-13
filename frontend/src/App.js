import './index.css';
import Main from './pages/Main/Main';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './Layouts/MainLayout/MainLayout';
import EventsPage from './pages/EventsPage';
import Locations from './pages/Locations';
import RoutesPage from './pages/RoutesPage';
import Rest from './pages/Rest';
import Team from './pages/Team';
import NotFound from './pages/NotFound';
import { Location2 } from './components/Main/Location/Location2/Location2';

const App = () => (
  <>
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Main />} />
        <Route path='events' element={<EventsPage />} />
        <Route path='locations' element={<Locations />} />
        <Route path='locations/:id' element={<Location2 />} />
        <Route path='routes' element={<RoutesPage />} />
        <Route path='rest' element={<Rest />} />
        <Route path='team' element={<Team />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </>
);

export default App;

