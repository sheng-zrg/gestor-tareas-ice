import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
export const Navbar = ({ totalTasks }) => {
    return (_jsx(AppBar, { position: "static", elevation: 1, children: _jsxs(Toolbar, { children: [_jsx(TaskAltIcon, { sx: { mr: 1.5 } }), _jsx(Typography, { variant: "h6", component: "div", sx: { flexGrow: 1, fontWeight: 600 }, children: "Gestor de Tareas ICE" }), _jsx(Box, { sx: { display: 'flex', alignItems: 'center' }, children: _jsx(Badge, { badgeContent: totalTasks, color: "secondary", sx: {
                            '& .MuiBadge-badge': {
                                right: -3,
                                top: 13,
                                border: `2px solid white`,
                                padding: '0 4px',
                            },
                        }, children: _jsx(Typography, { variant: "body2", children: "Tareas" }) }) })] }) }));
};
