<template>
  <div class="card shadow-sm my-2">
    <div class="card-body">
      <p class="m-0" :class="{ 'text-decoration-line-through': todo.estado }">
        {{ todo.texto }}
      </p>
      <div class="mt-2">
        <button
          class="btn btn-sm me-2"
          :class="todo.estado ? 'btn-success' : 'btn-warning'"
          @click="modificar(todo)"
        >
          {{ todo.estado ? "Finalizar" : "Pendiente" }}
        </button>
        <button class="btn btn-sm btn-danger" @click="eliminar(todo.id)">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import { useTodos } from "@/composables/useTodos";

export default {
  props: {
    todo: Object,
  },
  setup() {
    const { eliminarTodo, modificarTodo } = useTodos();
    const error = inject("error");
    const todos = inject("todos");

    const eliminar = async (id) => {
      const respuesta = eliminarTodo(id);

      if (respuesta.res) {
        error.value = respuesta.error;
        return;
      }

      todos.value = todos.value.filter((item) => item.id !== id);
    };

    const modificar = async (todo) => {
      const respuesta = await modificarTodo(todo);

      if (respuesta.res) {
        error.value = respuesta.error;
        return;
      }

      todos.value = todos.value.map((item) =>
        item.id === todo.id ? { ...item, estado: !todo.estado } : item
      );
    };
    return { modificar, eliminar };
  },
};
</script>