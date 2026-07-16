<script setup lang="ts">
import { ref, watch } from "vue";
import NovaLista from "./components/NovaLista.vue";
import ListaTarefas from "./components/ListaTarefas.vue";

export interface Tarefa {
  id: number;
  texto: string;
  concluida: boolean;
}

export interface Lista {
  id: number;
  titulo: string;
  tarefas: Tarefa[];
}

const listas = ref<Lista[]>([]);

// Carrega do localStorage
const dados = localStorage.getItem("listas");
if (dados) {
  listas.value = JSON.parse(dados);
}

// Salva automaticamente
watch(
  listas,
  () => {
    localStorage.setItem("listas", JSON.stringify(listas.value));
  },
  { deep: true }
);

function criarLista(titulo: string) {
  listas.value.push({
    id: Date.now(),
    titulo,
    tarefas: [],
  });
}

function removerLista(id: number) {
  listas.value = listas.value.filter((l) => l.id !== id);
}
</script>

<template>
  <div class="container">
    <h1>📋 Organizador de Tarefas</h1>

    <NovaLista @criar="criarLista" />

    <div class="listas">
      <ListaTarefas
        v-for="lista in listas"
        :key="lista.id"
        :lista="lista"
        @remover="removerLista"
      />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  background: #eef2f7;
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 30px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.listas {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
