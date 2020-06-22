import gql from 'graphql-tag';

const accountRegisterMutation = gql`
mutation CreateAccount($email: String!, $password: String!, $permission_id: ID!) {
  createAccount(accountInput: {email: $email, password: $password, permission_id: $permission_id}) {
    _id
    email
  }
}
`;

export {accountRegisterMutation};