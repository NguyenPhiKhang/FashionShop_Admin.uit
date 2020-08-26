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
      <div className="container">
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
              {token===null && <Route path="/auth" component={AuthNavigation} />}
              {token!==null && <Route path="/" component={MainNavigation} />}
              {token==null && <Redirect to="/auth/" exact />}
              {token!==null && <Redirect to="/" exact />}
            </Switch>
          </ApolloProvider>
        </AuthContext.Provider>
      </div>
    </React.Fragment>
  );
}

export default App;