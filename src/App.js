import React, { Component } from 'react';
import {Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import MainNavigation from './component/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';
import { useAppApolloClient } from './config/apolloClient';
import LoginPage from './pages/Login';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <ApolloProvider client={useAppApolloClient(this.state.token)}>
              <MainNavigation />
              <main className="main-content">
                <Switch>
                  {!this.state.token && (
                    <Route path="/auth" component={LoginPage} />
                  )}
                  {!this.state.token && <Redirect to="/auth" exact />}
                  {
                    console.log(this.state.token)
                  }
                </Switch>
              </main>
            </ApolloProvider>
          </AuthContext.Provider>
        </React.Fragment>
    );
  }
}

export default App;