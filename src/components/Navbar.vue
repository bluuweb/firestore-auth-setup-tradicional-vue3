<template>
  <nav class="navbar navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        {{ titulo }}
      </router-link>
      <div>
        <button
          class="btn btn-dark mx-2"
          @click="singIn"
          v-if="!isAuthenticated"
        >
          Acceder
        </button>
        <div v-else>
          <router-link to="/perfil" class="btn btn-dark mx-2">
            Perfil
          </router-link>
          <router-link to="/crud" class="btn btn-dark mx-2"> Crud </router-link>
          <button class="btn btn-danger mx-2" @click="singOut">Salir</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuth } from "@vueuse/firebase";
import { useAuthHook } from "@/composables/useAuthHook";
import { computed } from "vue";

export default {
  setup() {
    const { singIn, singOut } = useAuthHook();
    const { isAuthenticated, user } = useAuth();

    const titulo = computed(() => {
      return isAuthenticated.value ? user.value.displayName : "Firestore";
    });

    return { titulo, singOut, singIn, isAuthenticated };
  },
};
</script>