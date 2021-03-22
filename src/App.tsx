import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { useDispatch } from 'react-redux';
import { userInitLogin } from './features/authSlice';
import PrivateRoute from './components/PrivateRoute';
import CreatePost from './pages/CreatePost';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userInitLogin());
  }, [dispatch])

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <PrivateRoute path='/create-post' exact component={CreatePost} />
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
