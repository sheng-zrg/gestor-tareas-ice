import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { calcularScore } from './utils/ice';
export const TaskCard = ({ task, onAction }) => {
    const score = calcularScore(task.impact, task.confidence, task.ease);
    const color = score > 66 ? 'error' : score > 33 ? 'warning' : 'success';
    return (_jsxs(Card, { sx: { mb: 1 }, children: [_jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle1", children: task.description }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Score: ", score] })] }), _jsxs(CardActions, { children: [_jsx(Button, { size: "small", onClick: () => onAction({ type: 'edit', taskId: task.id }), children: "Editar" }), _jsx(Button, { size: "small", onClick: () => onAction({ type: 'delete', taskId: task.id }), children: "Eliminar" })] })] }));
};
