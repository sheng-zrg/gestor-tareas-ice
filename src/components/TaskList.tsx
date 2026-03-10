import React from 'react'
import { Task } from '../types'
import { TaskCard } from './TaskCard'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props { tasks: Task[]; onAction: (e: any) => void }

export const TaskList: React.FC<Props> = ({ tasks, onAction }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="textSecondary">
          No hay tareas. Crea una nueva para comenzar.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} onAction={onAction} />
      ))}
    </Box>
  )
}
