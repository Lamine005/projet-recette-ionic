<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <!-- Bouton pour revenir en arrière -->
          <ion-buttons slot="start">
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <!-- Titre de la page (affiché si recipe existe) -->
          <ion-title v-if="recipe">{{ recipe.strMeal }}</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true" v-if="recipe">
        <!-- Carte Ionic pour afficher les détails de la recette -->
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
              <!-- Liste des ingrédients générée à partir de recipeIngredients -->
              <li v-for="(ingredient, index) in recipeIngredients" :key="index">{{ ingredient }}</li>
            </ul>
            <!-- Instructions de préparation de la recette -->
            <p>{{ recipeInstructions }}</p>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonBackButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSpinner } from '@ionic/vue';
  import { ref, onMounted } from 'vue';
  import { getMealDetails } from '@/services/apiServices';
  import { useRoute } from 'vue-router';
  import { menuController } from '@ionic/vue';
  import { onBeforeUnmount } from 'vue';
  
  export default {
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonMenuButton,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardSubtitle,
      IonCardContent,
      IonSpinner,
      IonButtons,
      IonBackButton
    },
    setup() {
      const route = useRoute();
      const recipe = ref(null); // Référence pour stocker les détails de la recette
      const recipeIngredients = ref([]); // Référence pour stocker la liste des ingrédients
      const recipeInstructions = ref(""); // Référence pour stocker les instructions de préparation
  
      onMounted(async () => {
        menuController.enable(false); // Désactive le menu latéral
        const id = route.params.id; // Récupère l'ID de la recette à partir des paramètres de l'URL
        try {
          // Récupère les détails de la recette à partir de l'API en utilisant l'ID
          recipe.value = await getMealDetails(id);
  
          // Génère la liste des ingrédients à afficher
          for (let i = 1; i <= 20; i++) {
            const ingredient = recipe.value[`strIngredient${i}`];
            const measure = recipe.value[`strMeasure${i}`];
            if (ingredient && measure) {
              recipeIngredients.value.push(`${ingredient} - ${measure}`);
            }
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des détails de la recette:", error);
        }
        recipeInstructions.value = recipe.value.strInstructions; // Stocke les instructions de préparation
      });
  
      onBeforeUnmount(() => {
        menuController.enable(true); // Réactive le menu latéral lors de la destruction du composant
      });
  
      return { recipe, recipeIngredients, recipeInstructions };
    },
  };
  </script>
  
  <style scoped>
  /* Styles spécifiques au composant */
  </style>
  