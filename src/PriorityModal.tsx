import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Task } from './types'
import { calcularScore } from './utils/ice'

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
  }, [task])

  const score = calcularScore(impact, confidence, ease)

  const handleSave = () => {
    if (task) onSave({ impact, confidence, ease })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Prioridad</DialogTitle>
      <DialogContent>
        <TextField label="Impact" type="number" value={impact} onChange={(e) => setImpact(Number(e.target.value))} sx={{ mb: 1 }} fullWidth />
        <TextField label="Confidence" type="number" value={confidence} onChange={(e) => setConfidence(Number(e.target.value))} sx={{ mb: 1 }} fullWidth />
        <TextField label="Ease" type="number" value={ease} onChange={(e) => setEase(Number(e.target.value))} fullWidth />
        <div>Score: {score}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}
