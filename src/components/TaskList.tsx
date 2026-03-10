import React from 'react'
import { Task } from '../types'
import { TaskCard } from './TaskCard'

interface Props { tasks: Task[]; onAction: (e: any) => void }

export const TaskList: React.FC<Props> = ({ tasks, onAction }) => {
  if (!tasks || tasks.length === 0) return <div>No hay tareas</div>

  return (
    <div>
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} onAction={onAction} />
      ))}
    </div>
  )
}
