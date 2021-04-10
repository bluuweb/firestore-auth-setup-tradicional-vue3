import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'

import { auth } from './firebase/config'

let app;

// Esperamos que se detecte al usuario y luego creamos nuestra aplicación.
auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App).use(router).mount('#app')
    }
})



