import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { useDispatch } from 'react-redux';
import { userInitLogin } from './features/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userInitLogin());
  }, [dispatch])

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
