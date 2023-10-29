import { createApp } from 'vue'
import App from './App.vue'
import router from './router';


import { IonicVue } from '@ionic/vue';
import { IonButton, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/vue';
import VueVirtualScroller from 'vue-virtual-scroller';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* icones */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBowlFood, faDrumstickBite, faFish, faHamburger, faIceCream, faUserSecret } from '@fortawesome/free-solid-svg-icons'


const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(VueVirtualScroller); 
  
app.component('IonButton', IonButton);
app.component('IonContent', IonContent);
app.component('IonHeader', IonHeader);
app.component('IonIcon', IonIcon);
app.component('IonTitle', IonTitle);
app.component('IonToolbar', IonToolbar);

library.add(faBowlFood)
library.add(faDrumstickBite)
library.add(faHamburger)
library.add(faFish)
library.add(faIceCream)

app.component('font-awesome-icon', FontAwesomeIcon)
  
router.isReady().then(() => {
  app.mount('#app');
});
