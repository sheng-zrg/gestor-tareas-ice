import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Task } from '../types'
import { calcularScore } from '../utils/ice'
import { SCORE_COLORS } from '../constants'

interface Props {
  task: Task
  onAction: (e: { type: 'edit' | 'delete' | 'changeStatus'; taskId: string }) => void
}

export const TaskCard: React.FC<Props> = ({ task, onAction }) => {
  const score = calcularScore(task.impact, task.confidence, task.ease)
  const scoreColor = score > 66 ? SCORE_COLORS.high : score > 33 ? SCORE_COLORS.mid : SCORE_COLORS.low
  const scoreLabel = score > 66 ? 'Alto' : score > 33 ? 'Medio' : 'Bajo'

  return (
    <Card sx={{ mb: 1, transition: 'all 0.2s', '&:hover': { boxShadow: 3 } }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mb: 1 }}>
          <Typography variant="subtitle1" sx={{ flex: 1, wordBreak: 'break-word' }}>
            {task.description}
          </Typography>
          <Chip
            label={score}
            sx={{
              fontSize: '1rem',
              height: 'auto',
              py: 0.5,
              px: 1.5,
              bgcolor: scoreColor,
              color: 'white',
              fontWeight: 'bold',
              flexShrink: 0,
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="caption" color="textSecondary">
            I: {task.impact}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            C: {task.confidence}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            E: {task.ease}
          </Typography>
          <Chip label={scoreLabel} size="small" variant="outlined" />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={() => onAction({ type: 'edit', taskId: task.id })}
        >
          Editar
        </Button>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onAction({ type: 'delete', taskId: task.id })}
        >
          Eliminar
        </Button>
      </CardActions>
    </Card>
  )
}
