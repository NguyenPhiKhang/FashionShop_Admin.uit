import React from 'react';

export default React.createContext({
    token: null,
    accountId: null,
    login: (token, accountId, tokenExpiration) => {},
    logout: () => {}
});