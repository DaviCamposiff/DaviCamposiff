<script setup lang="ts">
import { ref } from "vue";
import Tarefa from "./Tarefa.vue";

interface TarefaItem {
  id: number;
  texto: string;
  concluida: boolean;
}

interface Lista {
  id: number;
  titulo: string;
  tarefas: TarefaItem[];
}

const props = defineProps<{
  lista: Lista;
}>();

const emit = defineEmits<{
  (e: "remover", id: number): void;
}>();

const novaTarefa = ref("");

function adicionarTarefa() {
  if (novaTarefa.value.trim() === "") return;

  props.lista.tarefas.push({
    id: Date.now(),
    texto: novaTarefa.value,
    concluida: false,
  });

  novaTarefa.value = "";
}

function removerTarefa(id: number) {
  props.lista.tarefas = props.lista.tarefas.filter(
    (t) => t.id !== id
  );
}
</script>

<template>
  <div class="card">
    <div class="topo">
      <h2>{{ lista.titulo }}</h2>

      <button class="excluir-lista" @click="emit('remover', lista.id)">
        🗑
      </button>
    </div>

    <div class="adicionar">
      <input
        v-model="novaTarefa"
        placeholder="Nova tarefa..."
        @keyup.enter="adicionarTarefa"
      />

      <button @click="adicionarTarefa">
        Adicionar
      </button>
    </div>

    <div class="tarefas">
      <Tarefa
        v-for="tarefa in lista.tarefas"
        :key="tarefa.id"
        :tarefa="tarefa"
        @remover="removerTarefa"
      />

      <p v-if="lista.tarefas.length === 0" class="vazio">
        Nenhuma tarefa adicionada.
      </p>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 340px;
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,.1);
}

.topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

h2 {
  margin: 0;
  color: #35495e;
}

.excluir-lista {
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  cursor: pointer;
}

.adicionar {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.adicionar input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.adicionar button {
  padding: 10px 14px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.tarefas {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.vazio {
  text-align: center;
  color: #888;
  margin-top: 10px;
}
</style>
