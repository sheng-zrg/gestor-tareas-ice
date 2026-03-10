import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { calcularScore } from '../utils/ice';
import { SCORE_COLORS } from '../constants';
export const TaskCard = ({ task, onAction }) => {
    const score = calcularScore(task.impact, task.confidence, task.ease);
    const scoreColor = score > 66 ? SCORE_COLORS.high : score > 33 ? SCORE_COLORS.mid : SCORE_COLORS.low;
    const scoreLabel = score > 66 ? 'Alto' : score > 33 ? 'Medio' : 'Bajo';
    return (_jsxs(Card, { sx: { mb: 1, transition: 'all 0.2s', '&:hover': { boxShadow: 3 } }, children: [_jsxs(CardContent, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mb: 1 }, children: [_jsx(Typography, { variant: "subtitle1", sx: { flex: 1, wordBreak: 'break-word' }, children: task.description }), _jsx(Chip, { label: score, sx: {
                                    fontSize: '1rem',
                                    height: 'auto',
                                    py: 0.5,
                                    px: 1.5,
                                    bgcolor: scoreColor,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    flexShrink: 0,
                                } })] }), _jsxs(Box, { sx: { display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }, children: [_jsxs(Typography, { variant: "caption", color: "textSecondary", children: ["I: ", task.impact] }), _jsxs(Typography, { variant: "caption", color: "textSecondary", children: ["C: ", task.confidence] }), _jsxs(Typography, { variant: "caption", color: "textSecondary", children: ["E: ", task.ease] }), _jsx(Chip, { label: scoreLabel, size: "small", variant: "outlined" })] })] }), _jsxs(CardActions, { children: [_jsx(Button, { size: "small", startIcon: _jsx(EditIcon, {}), onClick: () => onAction({ type: 'edit', taskId: task.id }), children: "Editar" }), _jsx(Button, { size: "small", color: "error", startIcon: _jsx(DeleteIcon, {}), onClick: () => onAction({ type: 'delete', taskId: task.id }), children: "Eliminar" })] })] }));
};
