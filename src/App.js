import React, { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import MainNavigation from './Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';
import { useAppApolloClient } from './config/apolloClient';
import AuthNavigation from './Navigation/AuthNavigation';

const App = () => {

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          login: login,
          logout: logout
        }}
      >
        <ApolloProvider client={useAppApolloClient(token)}>
          <Switch>
            {!token && <Route path="/auth" component={AuthNavigation} />}
            {token && <Route path="/" component={MainNavigation} />}
            {!token && <Redirect to="/auth/" exact />}
            {token && <Redirect to="/" exact />}
          </Switch>
        </ApolloProvider>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;