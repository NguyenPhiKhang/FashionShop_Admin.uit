import React from 'react';

export default React.createContext({
    token: null,
    accountId: null,
    name: null,
    login: (name, token, accountId, tokenExpiration) => {},
    logout: () => {}
});