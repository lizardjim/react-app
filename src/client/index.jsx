import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Api from './Api';
import Tools from './Tools';
import Add from './Add';
import Edit from './Edit';
import Remove from './Remove';
import View from './View';
import DisplayPage from './DisplayPage';
import Manage from './Manage-users';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Api' element={<Api />} />
        <Route path='/Tools' element={<Tools />} />
        <Route path='/Add' element={<Add />} />
        <Route path='/Edit' element={<Edit />} />
        <Route path='/View' element={<View />} />
        <Route path="View-more" element={<DisplayPage />} />
        <Route path='/Remove' element={<Remove />} />
        <Route path='/Manage-users' element={<Manage />} />
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>There is something here...</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('contents'),
);

