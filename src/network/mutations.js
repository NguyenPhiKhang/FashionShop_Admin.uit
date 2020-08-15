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
mutation CreateProduct($name: String!, $category_id: String!, $price: Float!, $promotion_percent: Float, $description: String!, $weight: Float, $is_freeship: Boolean, $images: [String], $option_amount: [OptionAmountInput]!){
  createProduct(productInput:{name: $name, price: $price, category_id: $category_id, is_freeship: $is_freeship,
    promotion_percent: $promotion_percent, description: $description, weight: $weight, images: $images, option_amount: $option_amount}){
    _id
    name
  }
}
`;

const deleteProductsMutation = gql`
mutation DeleteProduct($ids: [ID]!){
  deleteProduct(ids: $ids)
}
`;

const updateProductMutation = gql`
mutation UpdateProduct($id: ID!, $name: String, $price: Float, $promotion_percent: Float, $weight: Float, $is_freeship: Boolean, $description: String, $category: String, $images: [String], $option_amount: [OptionAmountInput]){
  updateProduct(productEditInput: {id: $id, name: $name, price: $price, promotion_percent: $promotion_percent, 
    			weight: $weight, is_freeship: $is_freeship, description: $description, category: $category, images: $images, option_amount: $option_amount})
}
`;

export {accountRegisterMutation, createProductMutation, deleteProductsMutation, updateProductMutation};