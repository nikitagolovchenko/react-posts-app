import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const auth = useSelector(selectAuth);

  return auth.authorized ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to='/' />
  );
};

export default PrivateRoute;
