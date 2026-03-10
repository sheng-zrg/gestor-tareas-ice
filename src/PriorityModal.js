import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { calcularScore } from './utils/ice';
export const PriorityModal = ({ task, open, onClose, onSave }) => {
    const [impact, setImpact] = useState(5);
    const [confidence, setConfidence] = useState(5);
    const [ease, setEase] = useState(5);
    useEffect(() => {
        if (task) {
            setImpact(task.impact);
            setConfidence(task.confidence);
            setEase(task.ease);
        }
    }, [task]);
    const score = calcularScore(impact, confidence, ease);
    const handleSave = () => {
        if (task)
            onSave({ impact, confidence, ease });
        onClose();
    };
    return (_jsxs(Dialog, { open: open, onClose: onClose, children: [_jsx(DialogTitle, { children: "Editar Prioridad" }), _jsxs(DialogContent, { children: [_jsx(TextField, { label: "Impact", type: "number", value: impact, onChange: (e) => setImpact(Number(e.target.value)), sx: { mb: 1 }, fullWidth: true }), _jsx(TextField, { label: "Confidence", type: "number", value: confidence, onChange: (e) => setConfidence(Number(e.target.value)), sx: { mb: 1 }, fullWidth: true }), _jsx(TextField, { label: "Ease", type: "number", value: ease, onChange: (e) => setEase(Number(e.target.value)), fullWidth: true }), _jsxs("div", { children: ["Score: ", score] })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: onClose, children: "Cancelar" }), _jsx(Button, { variant: "contained", onClick: handleSave, children: "Guardar" })] })] }));
};
