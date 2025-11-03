import { Link, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircle from '@mui/icons-material/AccountCircle'
import styles from './Header.module.css'

export default function Header() {
  const location = useLocation()

  return (
    <AppBar position="sticky" color="primary" elevation={1} sx={{ borderRadius: 0 }}>
      <Toolbar sx={{ gap: 1.5 }}>
        <IconButton size="large" edge="start" color="inherit" aria-label="open navigation">
          <MenuIcon />
        </IconButton>

        <Typography
          component={Link}
          to="/"
          variant="h6"
          className={styles.brand}
          sx={{ mr: 2, textDecoration: 'none', color: 'inherit' }}
        >
          AutoTools
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            variant={location.pathname === '/' ? 'outlined' : 'text'}
            sx={{ minWidth: 'auto' }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/youtube-shorts"
            color="inherit"
            variant={location.pathname === '/youtube-shorts' ? 'outlined' : 'text'}
            sx={{ minWidth: 'auto' }}
          >
            YouTube Shorts
          </Button>
          <Button
            component={Link}
            to="/channel-management"
            color="inherit"
            variant={location.pathname === '/channel-management' ? 'outlined' : 'text'}
            sx={{ minWidth: 'auto' }}
          >
            Channel Management
          </Button>
        </Stack>

        <Box className={styles.grow} />

        <Paper
          component="form"
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 1,
            py: 0.25,
            borderRadius: 2,
            bgcolor: (t) => (t.palette.mode === 'light' ? 'rgba(255,255,255,0.85)' : 'background.paper'),
            border: (t) => `1px solid ${t.palette.divider}`,
          }}
          className={styles.searchRoot}
          onSubmit={(e) => e.preventDefault()}
          aria-label="search"
        >
          <IconButton size="small" aria-label="search">
            <SearchIcon fontSize="small" />
          </IconButton>
          <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} sx={{ ml: 0.5, flex: 1 }} />
        </Paper>

        <Stack direction="row" spacing={0.5} sx={{ ml: 1 }}>
          <IconButton size="large" color="inherit" aria-label="notifications">
            <Badge color="error" variant="dot" overlap="circular">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton size="large" color="inherit" aria-label="account">
            <AccountCircle />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}


