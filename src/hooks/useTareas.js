import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { calcularScore } from '../utils/ice';
export function useTareas() {
    const [tasks, setTasks] = useLocalStorage('gestor-tareas-ice-tasks', []);
    const persist = useCallback((next) => {
        // ordenar por score descendente
        const sorted = [...next].sort((a, b) => {
            const sa = calcularScore(a.impact, a.confidence, a.ease);
            const sb = calcularScore(b.impact, b.confidence, b.ease);
            return sb - sa;
        });
        setTasks(sorted);
    }, [setTasks]);
    const addTask = (t) => {
        const task = { ...t, id: crypto.randomUUID() };
        persist([task, ...tasks]);
    };
    const updateTask = (id, changes) => {
        const updated = tasks.map((t) => (t.id === id ? { ...t, ...changes } : t));
        persist(updated);
    };
    const deleteTask = (id) => {
        persist(tasks.filter((t) => t.id !== id));
    };
    return { tasks, addTask, updateTask, deleteTask };
}
