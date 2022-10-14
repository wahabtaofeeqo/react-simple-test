import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
import NoPage from './pages/NoPage';
import EditProduct from './pages/EditProduct';

import { BrowserRouter, Routes, Route,} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path=':id' element={ <Details /> } />
          <Route path=':id/edit' element={ <EditProduct /> } />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
