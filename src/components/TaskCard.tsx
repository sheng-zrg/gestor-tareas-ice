import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { Task } from '../types'
import { calcularScore } from '../utils/ice'

interface Props {
  task: Task
  onAction: (e: { type: 'edit' | 'delete' | 'changeStatus'; taskId: string }) => void
}

export const TaskCard: React.FC<Props> = ({ task, onAction }) => {
  const score = calcularScore(task.impact, task.confidence, task.ease)
  const color = score > 66 ? 'error' : score > 33 ? 'warning' : 'success'

  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="subtitle1">{task.description}</Typography>
        <Typography variant="body2" color="text.secondary">Score: {score}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onAction({ type: 'edit', taskId: task.id })}>Editar</Button>
        <Button size="small" onClick={() => onAction({ type: 'delete', taskId: task.id })}>Eliminar</Button>
      </CardActions>
    </Card>
  )
}
