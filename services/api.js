const API_KEY = '31cb1f5d00fe47b1aee300ef0029113e'

export const fetchRecipesByIngredients = async (ingredient) => {
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    return data;
}