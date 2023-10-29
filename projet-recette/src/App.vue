<template>
  <ion-app>
    <!-- Menu latéral -->
    <ion-menu side="start" content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <!-- Titre du menu latéral -->
          <ion-title>Mes recettes</ion-title>
          <ion-text> &nbsp;&nbsp;&nbsp;&nbsp;Courriel : LamJean@mail.com</ion-text>
          <ion-buttons slot="end">
            <!-- Bouton de recherche -->
            <ion-button @click="toggleSearch">
              <ion-icon :icon="searchOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
        <!-- Barre de recherche (affichée si showSearch est vrai) -->
        <ion-searchbar v-if="showSearch" v-model="searchText"></ion-searchbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <!-- Élément du menu pour la page d'accueil -->
          <ion-item @click="navigateTo('/', 'Recette du moment')">
            <font-awesome-icon :icon="getCategoryIcon('Accueil')" />
            &nbsp; &nbsp;Accueil
            <font-awesome-icon icon="fa-regular fa-bowl-food" />
          </ion-item>
          <!-- Boucle à travers les catégories et crée des éléments du menu pour chaque catégorie -->
          <ion-item
            v-for="category in categories"
            :key="category"
            @click="navigateTo(`/list/${category}`)"
          >
            <font-awesome-icon :icon="getCategoryIcon(category)" />
            &nbsp; &nbsp;{{ category }}
          </ion-item>
        </ion-list>
      </ion-content>
      <ion-footer>
        <ion-toolbar>
          <!-- Pied de page du menu -->
          <ion-title>LamineXJean</ion-title>
        </ion-toolbar>
      </ion-footer>
    </ion-menu>

    <!-- Contenu principal -->
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>

<script setup>
import { ref } from "vue";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonFooter,
  IonApp,
  IonRouterOutlet,
  IonSearchbar,
  IonButtons,
  IonText
} from "@ionic/vue";
import { searchOutline } from "ionicons/icons";
import { menuController } from "@ionic/vue";
import { useRouter } from "vue-router";

// Donnees initiale
const categories = ["Chicken", "Beef", "Seafood", "Dessert"];

// Methodes
const showSearch = ref(false);
const searchText = ref("");
const router = useRouter();

// Navigateur
const navigateTo = (path, title = "") => {
  // Navigation avec les categories du menu
  router.push(path);
  menuController.close();
};

const categoryIcons = {
  Accueil: ['fas', 'fa-bowl-food'],
  Chicken: ['fas', 'fa-drumstick-bite'],
  Beef: ['fas', 'fa-hamburger'],
  Dessert: ['fas', 'fa-ice-cream'],
  Seafood: ['fas', 'fa-fish'],
};

const getCategoryIcon = (category) => {
  if (category in categoryIcons) {
    return categoryIcons[category];
  } else {
    return categoryIcons.Accueil; // Utilisation de l'icône "Accueil" par défaut
  }
};

const toggleSearch = () => {
  // Chargement ou pas de la barre de recherche
  showSearch.value = !showSearch.value;
};
</script>