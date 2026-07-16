export interface Tarefa {
  id: number
  texto: string
  concluida: boolean
}

export interface Lista {
  id: number
  titulo: string
  tarefas: Tarefa[]
}
