import gql from 'graphql-tag';

const accountRegisterMutation = gql`
mutation CreateAccount($name: String!, $email: String!, $password: String!, $permission_id: ID!) {
  createAccount(accountInput: {name: $name, email: $email, password: $password, permission_id: $permission_id}) {
    _id
    email
    password
    person{
			name
    }
  }
}
`;

export {accountRegisterMutation};