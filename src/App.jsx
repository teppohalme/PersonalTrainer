import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CustomersTable from './components/CustomersTable';
import TrainingsTable from './components/TrainingsTable';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navigation />
      <div className="main-content">
        <div className="table-container">
          <Routes>
            <Route path="/customers" element={<CustomersTable />} />
            <Route path="/trainings" element={<TrainingsTable />} />
            <Route path="/" element={<CustomersTable />} /> {}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
