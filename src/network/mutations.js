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

const createProductMutation = gql`
mutation CreateProduct($name: String!, $category_id: String!, $price: Float!, $promotion_percent: Float!, $description: String!, $weight: Float!, $images: [String], $option_amount: [OptionAmountInput]!){
  createProduct(productInput:{name: $name, price: $price, category_id: $category_id,
    promotion_percent: $promotion_percent, description: $description, weight: $weight, images: $images, option_amount: $option_amount}){
    _id
    name
  }
}
`;

export {accountRegisterMutation, createProductMutation};