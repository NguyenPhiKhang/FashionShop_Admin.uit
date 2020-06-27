import gql from 'graphql-tag';

const accountLoginQuery = gql`
query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      tokenExpiration
      account{
        _id
        permission{
          name
        }
        person{
          name
        }
      }
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

const getIdPermissionQuery = gql`
  query GetIdPermission($name: String!){
    getIdPermission(name: $name)
  }
`;

export {accountLoginQuery, getPermissionQuery, getIdPermissionQuery};