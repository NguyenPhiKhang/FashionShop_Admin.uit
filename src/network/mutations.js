import gql from 'graphql-tag';

const userRegisterMutation = gql`
mutation CreateUser($email: String!, $password: String!, $permission_id: ID!) {
  createUser(userInput: {email: $email, password: $password, permission_id: $permission_id}) {
    _id
    email
  }
}
`;

export {userRegisterMutation};