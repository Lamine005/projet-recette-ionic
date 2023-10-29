<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Bouton pour ouvrir le menu latéral -->
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <!-- Titre de la page -->
        <ion-title>Recette du moment</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="recipe">
      <!-- Carte Ionic pour afficher la recette -->
      <ion-card>
        <img :src="recipe.strMealThumb" />
        <ion-card-header>
          <!-- Titre de la recette -->
          <ion-card-title>{{ recipe.strMeal }}</ion-card-title>
          <!-- Origine de la recette -->
          <ion-card-subtitle>Origine : {{ recipe.strArea }}</ion-card-subtitle>
          <!-- Catégorie de la recette -->
          <ion-card-subtitle>Catégorie : {{ recipe.strCategory }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <h4>Ingrédients :</h4>
          <ul>
            <!-- Liste des ingrédients -->
            <li v-for="(ingredient, index) in ingredients" :key="index">{{ ingredient }}</li>
          </ul>
          <h4>Instructions :</h4>
          <!-- Instructions de préparation de la recette -->
          <p>{{ recipeInstructions }}</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonFooter,
  IonMenuButton,
  IonButtons,
} from '@ionic/vue';
import axios from 'axios';

export default defineComponent({
  name: 'FolderPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonFooter,
    IonMenuButton,
    IonButtons,
  },
  setup() {
    const recipe = ref(null); // Référence pour stocker la recette du moment
    const ingredients = ref([]); // Référence pour stocker la liste des ingrédients
    const recipeInstructions = ref(""); // Référence pour stocker les instructions de préparation

    onMounted(async () => {
      try {
        // Effectue une requête pour obtenir une recette aléatoire depuis une API
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
        if (response.data && response.data.meals && response.data.meals.length > 0) {
          recipe.value = response.data.meals[0]; // Stocke la recette obtenue
          // Récupère les ingrédients et leurs mesures
          for (let i = 1; i <= 20; i++) {
            if (recipe.value[`strIngredient${i}`]) {
              ingredients.value.push(`${recipe.value[`strIngredient${i}`]} - ${recipe.value[`strMeasure${i}`]}`);
            }
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la recette du moment:", error);
      }
      recipeInstructions.value = recipe.value.strInstructions; // Stocke les instructions de préparation

    });

    return { recipe, ingredients, recipeInstructions };
  }
});
</script>

<style scoped>

</style>
