<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "criar", titulo: string): void;
}>();

const titulo = ref("");

function criarLista() {
  if (titulo.value.trim() === "") return;

  emit("criar", titulo.value);

  titulo.value = "";
}
</script>

<template>
  <div class="nova-lista">
    <input
      v-model="titulo"
      placeholder="Digite o nome da lista..."
      @keyup.enter="criarLista"
    />

    <button @click="criarLista">
      ➕ Criar Lista
    </button>
  </div>
</template>

<style scoped>
.nova-lista {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
}

input {
  width: 300px;
  padding: 12px;
  border: 2px solid #42b883;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
}

input:focus {
  border-color: #35495e;
}

button {
  padding: 12px 20px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  transition: .2s;
}

button:hover {
  background: #36976d;
}
</style>
