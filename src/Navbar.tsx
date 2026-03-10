import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'

interface Props { totalTasks: number }

export const Navbar: React.FC<Props> = ({ totalTasks }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gestor Tareas ICE
        </Typography>
        <Badge badgeContent={totalTasks} color="secondary">
          <Typography variant="body2">Tareas</Typography>
        </Badge>
      </Toolbar>
    </AppBar>
  )
}
