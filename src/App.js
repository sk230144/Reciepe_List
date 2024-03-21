import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeListPage from './components/RecipeListPage';
import RecipeDetailsPage from './components/RecipeDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeListPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
