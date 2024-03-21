// RecipeDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetailsPage.css'; // Import the CSS file

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=eb25ac4e282d40e887d6bf3778c501f2`);
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details-container">
      <h1 className="recipe-title">{recipe.title}</h1>
      <p className="recipe-info">Ready in: {recipe.readyInMinutes} minutes</p>
      <p className="recipe-info">Servings: {recipe.servings}</p>
      <p className="recipe-source">
        Source: <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">{recipe.sourceName}</a>
      </p>
      <img src={`https://spoonacular.com/recipeImages/${recipe.image}`} alt={recipe.title} className="recipe-image" />
      <h2 className="section-title">Ingredients:</h2>
      <ul className="ingredient-list">
        {recipe.extendedIngredients.map(ingredient => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h2 className="section-title">Instructions:</h2>
      <ol className="instruction-list">
        {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
          recipe.analyzedInstructions[0].steps.map(step => (
            <li key={step.number}>{step.step}</li>
          ))
        ) : (
          <li>No instructions available.</li>
        )}
      </ol>
    </div>
  );
};

export default RecipeDetailsPage;
