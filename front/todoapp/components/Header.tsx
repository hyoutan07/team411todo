import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreateIcon from '@mui/icons-material/Create';
import ArticleIcon from '@mui/icons-material/Article';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import {Link as MuiLink} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import  Router  from 'next/router';
import Link from 'next/link';
import { jwtTokenContext } from '../pages/JwtContext';
import { SAVE_TOKEN_KEY } from '../pages/_app';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


type Props = {
  mainContent: JSX.Element,
};

export default function PersistentDrawerLeft({ mainContent, flgOpen }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const ctx = React.useContext(jwtTokenContext)


  const handleDrawerOpen = () => {
    if (flgOpen !== undefined) {
      flgOpen(true);
    }
    setOpen(true);
  };

  const handleDrawerClose = () => {
    if (flgOpen !== undefined) {
      flgOpen(false);
    }
    setOpen(false);
  };

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const LogoutButton = () => {
    window.localStorage.removeItem(SAVE_TOKEN_KEY)
    Router.push('/posts/login')
  }

  // menuのアイコン設定用の関数
  // ['Profile', 'Create', 'Report', 'TimeLine', '設定', '有料プラン']
  const menuIcon = (text) => {
    switch (text) {
      case "DashBoard":
        return <DashboardIcon />
      case "Profile":
        return <AccountBoxIcon />
      case 'Create':
        return <CreateIcon />
      case 'Report':
        return <ArticleIcon />
      case 'TimeLine':
        return <AccessTimeIcon />
      case '設定':
        return <SettingsIcon />
      case '有料プラン':
        return <PaidIcon />
      default:
        return <MenuIcon />;
    }
  }

  // menuのアイコン設定用の関数
  // ['Profile', 'Create', 'Report', 'TimeLine', '設定', '有料プラン']
  const linkMenu = (text) => {
    switch (text) {
      case "Dashboard":
        return '/';
      case "Profile":
        return "/posts/profile"
      case 'Create':
        return "/posts/create?detail=0"
      case 'Report':
        return "/posts/report"
      case 'TimeLine':
        return "/posts/timeline"
      case '設定':
        return "/posts/settings"
      case '有料プラン':
        return "/posts/paid"
      default:
        return "/";
    }
  }

  const numberComplete = 10;
  const numberIncomplete = 5;

  const numberFollower = 3;
  const numberFollow = 4;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography variant="h6" noWrap component="div">
              ToDo App
            </Typography>
          </Link>

          <Box sx={{ ml: "auto" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <MuiLink href="/posts/profile" underline="none" color="inherit" sx={{ display: "flex" }}>
                  <ListItemIcon>
                    <AccountBoxIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MuiLink>
              </MenuItem>
              <MenuItem onClick={LogoutButton}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >

        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ m: "auto" }}>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </Box>
            <Box sx={{ m: "auto" }}>
              <Button sx={{ m: "auto" }} size="small" variant="contained" startIcon={<LogoutIcon />} onClick = {LogoutButton} >Logout</Button>
            </Box>
          </Box>
          <Box sx={{ p: 1, pb: 0 }}>
            <Typography variant="caption" sx={{ m: 1 }} >未完了 {numberIncomplete}</Typography>
            <Typography variant="caption" sx={{ m: 1 }} >完了 {numberComplete}</Typography>
          </Box>
          <Box sx={{ p: 1, pb: 0 }}>
            <Typography variant="caption" sx={{ m: 1 }} >フォロー {numberFollow}</Typography>
            <Typography variant="caption" sx={{ m: 1 }} >フォロワー {numberFollower}</Typography>
          </Box>
        </Box>
        <Divider />
        <List>
          {['DashBoard', 'Profile', 'Create', 'Report', 'TimeLine', '設定', '有料プラン'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <Link href={linkMenu(text)}>
                <ListItemButton >
                  <ListItemIcon>
                    {
                      menuIcon(text)
                    }
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>


      <Main sx={{ p: 1, mt: 1 }} open={open}>
        <DrawerHeader sx={{display: "fixed"}} />
        {mainContent}
      </Main>
    </Box>
  );
}


