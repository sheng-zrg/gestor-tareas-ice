import { jsx as _jsx } from "react/jsx-runtime";
import { TaskCard } from './TaskCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
export const TaskList = ({ tasks, onAction }) => {
    if (!tasks || tasks.length === 0) {
        return (_jsx(Box, { sx: { textAlign: 'center', py: 4 }, children: _jsx(Typography, { variant: "body1", color: "textSecondary", children: "No hay tareas. Crea una nueva para comenzar." }) }));
    }
    return (_jsx(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 1 }, children: tasks.map((t) => (_jsx(TaskCard, { task: t, onAction: onAction }, t.id))) }));
};
