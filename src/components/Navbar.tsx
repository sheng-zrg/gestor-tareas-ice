import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

interface Props { totalTasks: number }

export const Navbar: React.FC<Props> = ({ totalTasks }) => {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <TaskAltIcon sx={{ mr: 1.5 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Gestor de Tareas ICE
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Badge
            badgeContent={totalTasks}
            color="secondary"
            sx={{
              '& .MuiBadge-badge': {
                right: -3,
                top: 13,
                border: `2px solid white`,
                padding: '0 4px',
              },
            }}
          >
            <Typography variant="body2">Tareas</Typography>
          </Badge>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
