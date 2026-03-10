import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar, FormCrearTarea, TaskList, PriorityModal } from './components';
import { useTareas, useModal } from './hooks';
import { calcularScore } from './utils/ice';
function App() {
    const { tasks, addTask, updateTask, deleteTask } = useTareas();
    const { open, selectedTask, openModal, closeModal } = useModal();
    const handleAction = (e) => {
        if (e.type === 'edit') {
            const t = tasks.find((x) => x.id === e.taskId);
            if (t)
                openModal(t);
        }
        else if (e.type === 'delete') {
            deleteTask(e.taskId);
        }
    };
    const sortedTasks = [...tasks].sort((a, b) => {
        const scoreA = calcularScore(a.impact, a.confidence, a.ease);
        const scoreB = calcularScore(b.impact, b.confidence, b.ease);
        return scoreB - scoreA;
    });
    return (_jsxs("div", { className: "app", children: [_jsx(Navbar, { totalTasks: tasks.length }), _jsxs("main", { style: { padding: 16 }, children: [_jsx(FormCrearTarea, { onAddTask: addTask }), _jsx(TaskList, { tasks: sortedTasks, onAction: handleAction }), _jsx(PriorityModal, { task: selectedTask, open: open, onClose: closeModal, onSave: (changes) => {
                            if (selectedTask) {
                                updateTask(selectedTask.id, changes);
                                closeModal();
                            }
                        } })] })] }));
}
export default App;
