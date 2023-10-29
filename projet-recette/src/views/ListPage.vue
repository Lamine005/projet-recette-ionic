<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Bouton pour ouvrir le menu latéral -->
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <!-- Titre de la page affichant la catégorie -->
        <ion-title>{{ category }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Composant RecycleScroller pour afficher la liste de recettes -->
      <recycle-scroller
        v-if="recipes && recipes.length"
        class="scroller"
        :items="recipes"
        :item-size="100"
        key-field="idMeal"
        v-slot="{ item }"
      >
        <!-- Élément de la liste de recettes -->
        <ion-item @click="viewDetails(item.idMeal)">
          <!-- Image de la recette -->
          <ion-thumbnail slot="start">
            <ion-img :src="item.strMealThumb" />
          </ion-thumbnail>
          <!-- Nom de la recette -->
          <ion-label>{{ item.strMeal }}</ion-label>
        </ion-item>
      </recycle-scroller>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { RecycleScroller } from "vue-virtual-scroller";
import { getMealsByCategory } from "@/services/apiServices";
import { IonMenuButton, IonPage, IonContent, IonThumbnail, IonImg, IonLabel, IonItem, IonButtons,IonTitle,IonHeader } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const category = ref(""); // Initialise la variable pour stocker la catégorie actuelle
const recipes = ref([]); // Initialise la variable pour stocker les recettes

const fetchRecipesByCategory = async (category) => {
  try {
    // Récupère les recettes par catégorie depuis le service API
    recipes.value = await getMealsByCategory(category);
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes:", error);
  }
};

const viewDetails = (id) => {
  // Redirige vers la page de détails de la recette avec l'ID spécifié
  router.push({ path: `/details/${id}` });
};

onMounted(() => {
  // Au chargement de la page, récupère la catégorie depuis l'URL et charge les recettes
  category.value = router.currentRoute.value.params.category;
  fetchRecipesByCategory(category.value);
});

watch(
  () => router.currentRoute.value.params.category,
  (newCategory, oldCategory) => {
    if (newCategory !== oldCategory) {
      // Si la catégorie dans l'URL a changé, met à jour la catégorie et récupère les recettes
      category.value = newCategory;
      fetchRecipesByCategory(category.value);
    }
  }
);
</script>

<style scoped>
.scroller {
  height: 100%;
}
</style>
