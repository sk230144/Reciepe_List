// RecipeListPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecipeListPage.css'; // Import the CSS file

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('https://api.spoonacular.com/recipes/search?query=pasta&number=10&apiKey=eb25ac4e282d40e887d6bf3778c501f2');
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };


  return (
    <div className="main-container">
      <h1 className="recipe-list-title">Recipe List</h1>
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
    </div>
  );
};

export default RecipeListPage;
