import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { Task } from '../types'
import { calcularScore } from '../utils/ice'

export function useTareas() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('gestor-tareas-ice-tasks', [])

  const persist = useCallback((next: Task[]) => {
    // ordenar por score descendente
    const sorted = [...next].sort((a, b) => {
      const sa = calcularScore(a.impact, a.confidence, a.ease)
      const sb = calcularScore(b.impact, b.confidence, b.ease)
      return sb - sa
    })
    setTasks(sorted)
  }, [setTasks])

  const addTask = (t: Omit<Task, 'id'>) => {
    const task: Task = { ...t, id: crypto.randomUUID() }
    persist([task, ...tasks])
  }

  const updateTask = (id: string, changes: Partial<Omit<Task, 'id'>>) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, ...changes } : t))
    persist(updated)
  }

  const deleteTask = (id: string) => {
    persist(tasks.filter((t) => t.id !== id))
  }

  return { tasks, addTask, updateTask, deleteTask }
}
