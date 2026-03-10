import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { analyzeTask } from '../services/gemini';
import { validarTarea } from '../utils/ice';
import { MAX_DESCRIPTION_LENGTH, ICE_MIN, ICE_MAX } from '../constants';
export const FormCrearTarea = ({ onAddTask }) => {
    const [description, setDescription] = useState('');
    const [impact, setImpact] = useState(5);
    const [confidence, setConfidence] = useState(5);
    const [ease, setEase] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const handleAnalyze = async () => {
        setError(null);
        if (!description.trim()) {
            setError('Por favor ingresa una descripción');
            return;
        }
        setLoading(true);
        try {
            const res = await analyzeTask(description);
            setImpact(Math.max(ICE_MIN, Math.min(ICE_MAX, res.impact)));
            setConfidence(Math.max(ICE_MIN, Math.min(ICE_MAX, res.confidence)));
            setEase(Math.max(ICE_MIN, Math.min(ICE_MAX, res.ease)));
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
        catch (e) {
            setError('Error al analizar tarea con IA: ' + (e instanceof Error ? e.message : 'Intenta de nuevo'));
        }
        finally {
            setLoading(false);
        }
    };
    const handleSave = () => {
        setError(null);
        const validation = validarTarea(description, impact, confidence, ease);
        if (!validation.valid) {
            setError(validation.errors.join(', '));
            return;
        }
        onAddTask({ description, impact, confidence, ease, status: 'pending', explanation: '' });
        setDescription('');
        setImpact(5);
        setConfidence(5);
        setEase(5);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
    };
    return (_jsx(Card, { sx: { mb: 2 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", sx: { mb: 2 }, children: "Crear Nueva Tarea" }), error && _jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error }), success && _jsx(Alert, { severity: "success", sx: { mb: 2 }, children: "Tarea guardada exitosamente" }), _jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 1.5 }, children: [_jsx(TextField, { fullWidth: true, label: "Descripci\u00F3n", value: description, onChange: (e) => setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH)), helperText: `${description.length}/${MAX_DESCRIPTION_LENGTH}`, multiline: true, rows: 2, placeholder: "Describe la tarea..." }), _jsxs(Box, { sx: { display: 'flex', gap: 1, flexWrap: 'wrap' }, children: [_jsx(TextField, { label: "Impacto", type: "number", value: impact, onChange: (e) => {
                                        const val = Number(e.target.value);
                                        setImpact(Math.max(ICE_MIN, Math.min(ICE_MAX, val)));
                                    }, inputProps: { min: ICE_MIN, max: ICE_MAX }, sx: { flex: 1, minWidth: 100 } }), _jsx(TextField, { label: "Confianza", type: "number", value: confidence, onChange: (e) => {
                                        const val = Number(e.target.value);
                                        setConfidence(Math.max(ICE_MIN, Math.min(ICE_MAX, val)));
                                    }, inputProps: { min: ICE_MIN, max: ICE_MAX }, sx: { flex: 1, minWidth: 100 } }), _jsx(TextField, { label: "Facilidad", type: "number", value: ease, onChange: (e) => {
                                        const val = Number(e.target.value);
                                        setEase(Math.max(ICE_MIN, Math.min(ICE_MAX, val)));
                                    }, inputProps: { min: ICE_MIN, max: ICE_MAX }, sx: { flex: 1, minWidth: 100 } })] }), _jsxs(Box, { sx: { display: 'flex', gap: 1, flexWrap: 'wrap' }, children: [_jsx(Button, { onClick: handleAnalyze, disabled: loading || !description.trim(), variant: "outlined", children: loading ? 'Analizando...' : 'Analizar con IA' }), _jsx(Button, { variant: "contained", onClick: handleSave, disabled: loading || !description.trim(), children: "Guardar Tarea" })] })] })] }) }));
};
