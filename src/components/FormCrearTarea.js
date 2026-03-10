import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { analyzeTask } from '../services/gemini';
export const FormCrearTarea = ({ onAddTask }) => {
    const [description, setDescription] = useState('');
    const [impact, setImpact] = useState(5);
    const [confidence, setConfidence] = useState(5);
    const [ease, setEase] = useState(5);
    const [loading, setLoading] = useState(false);
    const handleAnalyze = async () => {
        setLoading(true);
        try {
            const res = await analyzeTask(description);
            setImpact(res.impact);
            setConfidence(res.confidence);
            setEase(res.ease);
        }
        catch (e) {
            // ignore for now
        }
        finally {
            setLoading(false);
        }
    };
    const handleSave = () => {
        onAddTask({ description, impact, confidence, ease, status: 'pending', explanation: '' });
        setDescription('');
    };
    return (_jsxs(Box, { sx: { mb: 2 }, children: [_jsx(TextField, { fullWidth: true, label: "Descripci\u00F3n", value: description, onChange: (e) => setDescription(e.target.value), sx: { mb: 1 } }), _jsxs(Box, { sx: { display: 'flex', gap: 1, mb: 1 }, children: [_jsx(TextField, { label: "Impact", type: "number", value: impact, onChange: (e) => setImpact(Number(e.target.value)) }), _jsx(TextField, { label: "Confidence", type: "number", value: confidence, onChange: (e) => setConfidence(Number(e.target.value)) }), _jsx(TextField, { label: "Ease", type: "number", value: ease, onChange: (e) => setEase(Number(e.target.value)) })] }), _jsx(Button, { onClick: handleAnalyze, disabled: loading || description.length === 0, sx: { mr: 1 }, children: "Analizar" }), _jsx(Button, { variant: "contained", onClick: handleSave, children: "Guardar" })] }));
};
