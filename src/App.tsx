import React from 'react'
import { Navbar, FormCrearTarea, TaskList, PriorityModal } from './components'
import { useTareas, useModal } from './hooks'

function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTareas()
  const { open, selectedTask, openModal, closeModal } = useModal()

  const handleAction = (e: any) => {
    if (e.type === 'edit') {
      const t = tasks.find((x) => x.id === e.taskId)
      if (t) openModal(t)
    } else if (e.type === 'delete') {
      deleteTask(e.taskId)
    }
  }

  const handleSaveModal = (changes: any) => {
    if (selectedTask) updateTask(selectedTask.id, changes)
    closeModal()
  }

  return (
    <div>
      <Navbar totalTasks={tasks.length} />
      <main style={{ padding: 16 }}>
        <FormCrearTarea onAddTask={addTask} />
        <TaskList tasks={tasks} onAction={handleAction} />
        <PriorityModal task={selectedTask} open={open} onClose={closeModal} onSave={handleSaveModal} />
      </main>
    </div>
  )
}

export default App
