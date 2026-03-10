import { jsx as _jsx } from "react/jsx-runtime";
import { TaskCard } from './TaskCard';
export const TaskList = ({ tasks, onAction }) => {
    if (!tasks || tasks.length === 0)
        return _jsx("div", { children: "No hay tareas" });
    return (_jsx("div", { children: tasks.map((t) => (_jsx(TaskCard, { task: t, onAction: onAction }, t.id))) }));
};
