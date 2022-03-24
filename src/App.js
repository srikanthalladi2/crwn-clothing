import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';

const Shop = () => {
  return (
    <div>Shop Me</div>
  );
}

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<HomePage />} />
          <Route path='shop' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
