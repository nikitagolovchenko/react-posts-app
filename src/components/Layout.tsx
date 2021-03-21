import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, userLogin, userLogout } from './../features/authSlice';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginRight: 'auto',
  },
  appBar: {
    marginBottom: theme.spacing(3),
  },
  avatar: {
    marginLeft: theme.spacing(1)
  },
}));

const Layout: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const auth = useSelector(selectAuth);

  const loginHandler = (): void => {
    dispatch(userLogin());
  };

  const logoutHandler = (): void => {
    dispatch(userLogout());
  };

  return (
    <Box width='100%' position='relative' overflow='hidden'>
      <CssBaseline />

      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
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
            <Avatar alt={auth.user.displayName} src={auth.user.photoURL} className={classes.avatar} title={auth.user.displayName} />
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth='md'>
        <main>{children}</main>
      </Container>
    </Box>
  );
};

export default Layout;
