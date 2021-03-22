import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CreateIcon from '@material-ui/icons/Create';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, userLogin, userLogout } from './../features/authSlice';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginRight: 'auto',
    color: 'inherit',
    textDecoration: 'none',
  },
  avatar: {
    marginLeft: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuList: {
    marginTop: theme.mixins.toolbar.minHeight,
  },
}));

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const auth = useSelector(selectAuth);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const loginHandler = (): void => {
    dispatch(userLogin());
  };

  const logoutHandler = (): void => {
    dispatch(userLogout());
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        {auth.authorized && (
          <>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
              <List className={classes.menuList}>
                <ListItem button to='/create-post' component={NavLink}>
                  <ListItemIcon>
                    <CreateIcon />
                  </ListItemIcon>
                  <ListItemText primary='Create Post' />
                </ListItem>
              </List>
            </Drawer>
          </>
        )}
        <Typography
          variant='h6'
          className={classes.title}
          component={NavLink}
          to='/'
        >
          React Posts App
        </Typography>
        {!auth.authorized && (
          <Button color='inherit' onClick={loginHandler}>
            Login
          </Button>
        )}
        {auth.authorized && (
          <Button color='inherit' onClick={logoutHandler}>
            Logout
          </Button>
        )}
        {auth.authorized && (
          <Avatar
            alt={auth.user.displayName}
            src={auth.user.photoURL}
            className={classes.avatar}
            title={auth.user.displayName}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
