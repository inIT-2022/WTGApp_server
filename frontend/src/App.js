import Main from './pages/Main/Main';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './Layouts/MainLayout/MainLayout';
import NotFound from './pages/NotFound';
import { Location2 } from './components/Main/Location/Location2/Location2';
import { useState } from 'react';

const App = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
  <>
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Main searchValue={searchValue} setSearchValue={setSearchValue} />} />
        <Route path='locations/:id' element={<Location2 />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </>
  );
};


export default App;
