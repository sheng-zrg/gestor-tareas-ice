import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { Task } from '../types'
import { calcularScore } from '../utils/ice'
import { ICE_MIN, ICE_MAX, SCORE_COLORS } from '../constants'

interface Props {
  task: Task | null
  open: boolean
  onClose: () => void
  onSave: (changes: Partial<Omit<Task, 'id'>>) => void
}

export const PriorityModal: React.FC<Props> = ({ task, open, onClose, onSave }) => {
  const [impact, setImpact] = useState(5)
  const [confidence, setConfidence] = useState(5)
  const [ease, setEase] = useState(5)

  useEffect(() => {
    if (task) {
      setImpact(task.impact)
      setConfidence(task.confidence)
      setEase(task.ease)
    }
  }, [task, open])

  const score = calcularScore(impact, confidence, ease)
  const scoreColor = score > 66 ? SCORE_COLORS.high : score > 33 ? SCORE_COLORS.mid : SCORE_COLORS.low

  const handleSave = () => {
    if (task && impact >= ICE_MIN && impact <= ICE_MAX && confidence >= ICE_MIN && confidence <= ICE_MAX && ease >= ICE_MIN && ease <= ICE_MAX) {
      onSave({ impact, confidence, ease })
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Prioridad - {task?.description}</DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Impacto"
            type="number"
            value={impact}
            onChange={(e) => {
              const val = Number(e.target.value)
              setImpact(Math.max(ICE_MIN, Math.min(ICE_MAX, val)))
            }}
            inputProps={{ min: ICE_MIN, max: ICE_MAX }}
            fullWidth
            helperText={`Rango: ${ICE_MIN}-${ICE_MAX}`}
          />
          <TextField
            label="Confianza"
            type="number"
            value={confidence}
            onChange={(e) => {
              const val = Number(e.target.value)
              setConfidence(Math.max(ICE_MIN, Math.min(ICE_MAX, val)))
            }}
            inputProps={{ min: ICE_MIN, max: ICE_MAX }}
            fullWidth
            helperText={`Rango: ${ICE_MIN}-${ICE_MAX}`}
          />
          <TextField
            label="Facilidad"
            type="number"
            value={ease}
            onChange={(e) => {
              const val = Number(e.target.value)
              setEase(Math.max(ICE_MIN, Math.min(ICE_MAX, val)))
            }}
            inputProps={{ min: ICE_MIN, max: ICE_MAX }}
            fullWidth
            helperText={`Rango: ${ICE_MIN}-${ICE_MAX}`}
          />
          
          <Box sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Score ICE</Typography>
            <Chip
              label={`${score}`}
              sx={{ fontSize: '1.2rem', height: 'auto', py: 1, px: 2, bgcolor: scoreColor, color: 'white', fontWeight: 'bold' }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>Guardar Cambios</Button>
      </DialogActions>
    </Dialog>
  )
}
