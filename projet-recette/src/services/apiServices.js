// Import d'Axios pour effectuer des requêtes HTTP
import axios from 'axios';

// URL de base de l'API des recettes
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

// Fonction pour obtenir une recette aléatoire
export const getRandomMeal = async () => {
  // Effectue une requête GET pour obtenir une recette aléatoire
  const response = await axios.get(`${BASE_URL}random.php`);
  // Retourne la première recette du tableau de résultats
  return response.data.meals[0];
};

// Fonction pour obtenir des recettes par catégorie
export const getMealsByCategory = async (category) => {
  // Effectue une requête GET pour obtenir des recettes d'une catégorie spécifique
  const response = await axios.get(`${BASE_URL}filter.php?c=${category}`);
  // Retourne un tableau de recettes
  return response.data.meals;
};

// Fonction pour obtenir les détails d'une recette par son ID
export async function getMealDetails(id) {
  try {
    // Effectue une requête GET pour obtenir les détails de la recette par son ID
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    // Vérifie si des données de recette ont été renvoyées et s'il y a au moins une recette
    if (response.data && response.data.meals && response.data.meals.length > 0) {
      // Retourne la première recette du tableau de résultats
      return response.data.meals[0];
    }
    // Si aucune recette n'est trouvée, retourne null
    return null;
  } catch (error) {
    // En cas d'erreur lors de la requête, affiche une erreur dans la console et retourne null
    console.error("Erreur lors de la récupération des détails de la recette:", error);
    return null;
  }
}
