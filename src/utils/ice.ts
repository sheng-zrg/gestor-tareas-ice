import { ICE_MAX, ICE_MIN, MAX_DESCRIPTION_LENGTH } from '../constants'

export function calcularScore(impact: number, confidence: number, ease: number): number {
  // Sustituir ease=0 con 1 para evitar división por cero
  const adjustedEase = ease === 0 ? 1 : ease
  // Fórmula: (impact * confidence * 10) / ease redondeado a entero
  const score = Math.round((impact * confidence * 10) / adjustedEase)
  // Retornar rango [0, 100]
  return Math.max(0, Math.min(100, score))
}

export function validarTarea(
  description: string,
  impact: number,
  confidence: number,
  ease: number
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Description entre 1 y MAX_DESCRIPTION_LENGTH
  if (description.length < 1 || description.length > MAX_DESCRIPTION_LENGTH) {
    errors.push(`Description must be between 1 and ${MAX_DESCRIPTION_LENGTH} characters`)
  }

  // Impact, confidence, ease entre ICE_MIN y ICE_MAX
  if (impact < ICE_MIN || impact > ICE_MAX) {
    errors.push(`Impact must be between ${ICE_MIN} and ${ICE_MAX}`)
  }
  if (confidence < ICE_MIN || confidence > ICE_MAX) {
    errors.push(`Confidence must be between ${ICE_MIN} and ${ICE_MAX}`)
  }
  if (ease < ICE_MIN || ease > ICE_MAX) {
    errors.push(`Ease must be between ${ICE_MIN} and ${ICE_MAX}`)
  }

  return { valid: errors.length === 0, errors }
}
