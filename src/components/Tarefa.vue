<script setup lang="ts">
import type { Tarefa } from "../App.vue";

const props = defineProps<{
  tarefa: Tarefa;
}>();

const emit = defineEmits<{
  (e: "remover", id: number): void;
}>();
</script>

<template>
  <div class="tarefa">
    <label class="texto">
      <input
        type="checkbox"
        v-model="props.tarefa.concluida"
      />

      <span :class="{ concluida: props.tarefa.concluida }">
        {{ props.tarefa.texto }}
      </span>
    </label>

    <button
      class="btnExcluir"
      @click="emit('remover', props.tarefa.id)"
    >
      ❌
    </button>
  </div>
</template>

<style scoped>
.tarefa {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.texto {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  flex: 1;
}

.concluida {
  text-decoration: line-through;
  color: gray;
}

.btnExcluir {
  background: crimson;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  transition: 0.2s;
}

.btnExcluir:hover {
  background: darkred;
}
</style>
