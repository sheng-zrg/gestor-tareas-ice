import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
export const Navbar = ({ totalTasks }) => {
    return (_jsx(AppBar, { position: "static", children: _jsxs(Toolbar, { children: [_jsx(Typography, { variant: "h6", component: "div", sx: { flexGrow: 1 }, children: "Gestor Tareas ICE" }), _jsx(Badge, { badgeContent: totalTasks, color: "secondary", children: _jsx(Typography, { variant: "body2", children: "Tareas" }) })] }) }));
};
