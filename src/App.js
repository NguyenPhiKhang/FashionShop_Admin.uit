import React, { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import MainNavigation from './Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';
import { useAppApolloClient } from './config/apolloClient';
import AuthNavigation from './Navigation/AuthNavigation';

const App = () => {

  const [token, setToken] = useState("");
  const [accountId, setAccountId] = useState(null);
  const [nameAdmin, setNameAdmin] = useState(null);

  const login = (name, token, accountId, tokenExpiration) => {
    setToken(token);
    setAccountId(accountId);
    setNameAdmin(name);
  };

  const logout = () => {
    setToken(null);
    setAccountId(null);
    setNameAdmin(null);
  };

  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{
          name: nameAdmin,
          token: token,
          accountId: accountId,
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