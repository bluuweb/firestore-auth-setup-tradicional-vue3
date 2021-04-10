<template>
  <div v-if="isAuthenticated">
    <h1>Crud Firestore</h1>
    <hr />
    <div v-if="cargando">
      <Cargando />
    </div>
    <div v-else>
      <Error v-if="pintarError" />
      <TodoForm />
      <Todo v-for="todo in todos" :key="todo.id" :todo="todo" />
    </div>
  </div>
</template>

<script>
import Cargando from "@/components/Cargando";
import TodoForm from "@/components/TodoForm";
import Error from "@/components/Error";
import Todo from "@/components/Todo";

import { useAuth } from "@vueuse/firebase";
import { useTodos } from "@/composables/useTodos";
import { onMounted, provide, ref, computed } from "vue";
export default {
  components: { Cargando, TodoForm, Error, Todo },
  setup() {
    const { isAuthenticated, user } = useAuth();
    const { getTodos, cargando } = useTodos();
    const todos = ref([]);
    const error = ref(null);

    provide("todos", todos);
    provide("error", error);

    const pintarError = computed(() => (error.value ? true : false));

    onMounted(async () => {
      todos.value = await getTodos();
      if (todos.value.res) {
        error.value = todos.value.error;
      }
    });

    return {
      isAuthenticated,
      user,
      getTodos,
      cargando,
      todos,
      error,
      pintarError,
    };
  },
};
</script>