import Main from './pages/Main/Main';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './Layouts/MainLayout/MainLayout';
import NotFound from './pages/NotFound';
import { Location2 } from './components/Main/Location/Location2/Location2';

const App = () => (
  <>
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Main />} />
        <Route path='locations/:id' element={<Location2 />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </>
);

export default App;
