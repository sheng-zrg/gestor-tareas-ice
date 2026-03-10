import React from 'react'
import { Navbar, FormCrearTarea, TaskList, PriorityModal } from './components'
import { useTareas, useModal } from './hooks'
import { calcularScore } from './utils/ice'

interface ActionEvent {
  type: 'edit' | 'delete' | 'changeStatus'
  taskId: string
}

function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTareas()
  const { open, selectedTask, openModal, closeModal } = useModal()

  const handleAction = (e: ActionEvent) => {
    if (e.type === 'edit') {
      const t = tasks.find((x) => x.id === e.taskId)
      if (t) openModal(t)
    } else if (e.type === 'delete') {
      deleteTask(e.taskId)
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    const scoreA = calcularScore(a.impact, a.confidence, a.ease)
    const scoreB = calcularScore(b.impact, b.confidence, b.ease)
    return scoreB - scoreA
  })

  return (
    <div className="app">
      <Navbar totalTasks={tasks.length} />
      <main style={{ padding: 16 }}>
        <FormCrearTarea onAddTask={addTask} />
        <TaskList tasks={sortedTasks} onAction={handleAction} />
        <PriorityModal
          task={selectedTask}
          open={open}
          onClose={closeModal}
          onSave={(changes) => {
            if (selectedTask) {
              updateTask(selectedTask.id, changes)
              closeModal()
            }
          }}
        />
      </main>
    </div>
  )
}

export default App
