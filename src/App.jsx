import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import SummaryPage from './pages/SummaryPage';
import CreateForm from './pages/CreateForm';
import EditForm from './pages/EditForm';
import DetailPage from './pages/DetailPage';

export default function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', backgroundColor: '#ddd' }}>
        <Link to="/" style={{ marginRight: 10 }}>Summary</Link>
        <Link to="/create">Create Crewmate</Link>
      </nav>

      <Routes>
        <Route path="/" element={<SummaryPage />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/edit/:id" element={<EditForm />} />
        <Route path="/crewmate/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}
