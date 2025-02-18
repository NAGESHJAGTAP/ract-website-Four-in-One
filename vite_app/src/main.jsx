
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './assets/Components/Home.jsx'
import { Nevbar } from './assets/Components/Nevbar.jsx';
import Meals from './assets/Components/Meals.jsx';
import Cocktail from './assets/Components/Cocktail.jsx';
import Potter from './assets/Components/Potter.jsx';
import Bank from './assets/Components/Bank.jsx';
import Student from './assets/Components/student.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Nevbar /> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/meals" element={<Meals />} />
        <Route path="/cocktail" element={<Cocktail />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/Potter" element={<Potter />} />
        <Route path="/Student" element={<Student/>}/>
      </Routes>
    </Router>
  </StrictMode>
);

