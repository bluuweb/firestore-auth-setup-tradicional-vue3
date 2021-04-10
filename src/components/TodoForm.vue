<template>
  <form @submit.prevent="procesarFormulario">
    <input
      type="text"
      class="form-control"
      placeholder="Enter para agregar Todo"
      v-model.trim="texto"
    />
  </form>
</template>

<script>
import { inject, ref } from "vue";
import { useTodos } from "@/composables/useTodos";

export default {
  setup() {
    const { agregarTodo } = useTodos();

    const texto = ref("");
    const todos = inject("todos");
    const error = inject("error");

    const procesarFormulario = async () => {
      if (!texto.value.trim()) {
        console.log("texto vacio");
        error.value = "texto vacio";
        return;
      }

      error.value = null;

      const todo = await agregarTodo(texto.value);

      if (todo.res) {
        error.value = todo.error;
        texto.value = "";
        return;
      }

      todos.value = [...todos.value, todo];
      texto.value = "";
    };

    return { texto, procesarFormulario };
  },
};
</script>