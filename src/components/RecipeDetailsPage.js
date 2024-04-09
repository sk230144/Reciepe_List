import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import './RecipeDetailsPage.css'; // Import the CSS file

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(() => {
    return parseInt(localStorage.getItem(`recipe_${id}_rating`) || 0);
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchRecipeDetails();
  }, [id, submitted]);

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=eb25ac4e282d40e887d6bf3778c501f2`);
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleSubmitRating = (event) => {
    event.preventDefault();
    try {
      // Save the rating to localStorage
      localStorage.setItem(`recipe_${id}_rating`, rating);
      setSubmitted(true);
      alert("Your review is helpful for us, thanks!")
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Recipe Details</h1>
      <div className="recipe-details-container">
      <div className='home-link'>
      <Link to="/">Go Back</Link> {/* Add home button */}
      </div>
        
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
        <h2 className="section-title">Rate this recipe:</h2>
        <form onSubmit={handleSubmitRating}>
          <input 
            type="number" 
            min="1" 
            max="5" 
            value={rating} 
            onChange={handleRatingChange} 
          />
          <button type="submit">Submit Rating</button>
        </form>
      </div>
    </>
  );
};

export default RecipeDetailsPage;
