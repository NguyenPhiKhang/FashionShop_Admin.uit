import gql from 'graphql-tag';

const userLoginQuery = gql`
query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

const getPermissionQuery = gql`
  query GetPermission{
    getPermission{
      _id
      name
    }
  }
`;

export {userLoginQuery, getPermissionQuery};