import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecipeListPage.css'; // Import the CSS file

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, [selectedCategory]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      let url = `https://api.spoonacular.com/recipes/search?number=10&apiKey=eb25ac4e282d40e887d6bf3778c501f2`;
      if (searchQuery) {
        url += `&query=${searchQuery}`;
      }
      if (selectedCategory) {
        url += `&cuisine=${selectedCategory}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchRecipes();
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="main-container">
    <h1 style={{ textAlign: 'center' }}>Recipe List</h1>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search by name or ingredients" className="search-input" />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="filter-container">
        <label htmlFor="category">Filter by Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
          <option value="indian">Indian</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="recipe-list">
          {recipes.map(recipe => (
            <li key={recipe.id} className="recipe-item">
              <Link to={`/recipes/${recipe.id}`}>
                <div className="recipe-card">
                  <img src={`https://spoonacular.com/recipeImages/${recipe.image}`} alt={recipe.title} className="recipe-image" />
                  <p className="recipe-title">{recipe.title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeListPage;
