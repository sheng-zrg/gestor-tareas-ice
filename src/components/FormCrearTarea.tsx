import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { analyzeTask } from '../services/gemini'
import { Task } from '../types'

interface Props { onAddTask: (t: Omit<Task, 'id'>) => void }

export const FormCrearTarea: React.FC<Props> = ({ onAddTask }) => {
  const [description, setDescription] = useState('')
  const [impact, setImpact] = useState(5)
  const [confidence, setConfidence] = useState(5)
  const [ease, setEase] = useState(5)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const res = await analyzeTask(description)
      setImpact(res.impact)
      setConfidence(res.confidence)
      setEase(res.ease)
    } catch (e) {
      // ignore for now
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    onAddTask({ description, impact, confidence, ease, status: 'pending', explanation: '' })
    setDescription('')
  }

  return (
    <Box sx={{ mb: 2 }}>
      <TextField fullWidth label="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 1 }} />
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <TextField label="Impact" type="number" value={impact} onChange={(e) => setImpact(Number(e.target.value))} />
        <TextField label="Confidence" type="number" value={confidence} onChange={(e) => setConfidence(Number(e.target.value))} />
        <TextField label="Ease" type="number" value={ease} onChange={(e) => setEase(Number(e.target.value))} />
      </Box>
      <Button onClick={handleAnalyze} disabled={loading || description.length === 0} sx={{ mr: 1 }}>Analizar</Button>
      <Button variant="contained" onClick={handleSave}>Guardar</Button>
    </Box>
  )
}
