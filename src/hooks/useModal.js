import { useState } from 'react';
export function useModal() {
    const [state, setState] = useState({ open: false, selectedTask: null });
    const openModal = (task) => setState({ open: true, selectedTask: task });
    const closeModal = () => setState({ open: false, selectedTask: null });
    return { open: state.open, selectedTask: state.selectedTask, openModal, closeModal };
}
