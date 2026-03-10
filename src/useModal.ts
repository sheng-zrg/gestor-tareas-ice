import { useState } from 'react'
import { ModalState, Task } from './types'

export function useModal() {
  const [state, setState] = useState<ModalState>({ open: false, selectedTask: null })

  const openModal = (task: Task) => setState({ open: true, selectedTask: task })
  const closeModal = () => setState({ open: false, selectedTask: null })

  return { open: state.open, selectedTask: state.selectedTask, openModal, closeModal }
}
