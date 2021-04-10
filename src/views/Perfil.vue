<template>
  <div v-if="isAuthenticated">
    <h1>Ruta protegida</h1>
    <hr />
    <pre>Bienvenido: {{ user }}</pre>
  </div>
</template>

<script>
import { useAuth } from "@vueuse/firebase";
export default {
  setup() {
    const { user, isAuthenticated } = useAuth();
    return { user, isAuthenticated };
  },
};
</script>