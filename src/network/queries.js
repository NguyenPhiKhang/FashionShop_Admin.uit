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

const getAllCategories = gql`
query GetAllCategories{
  getAllCategory(level: 1){
    value:category_code
    label:name
    children:subCat{
      value:category_code
      label:name
      children:subCat{
        value:category_code
      label:name
      }
    }
  }
}
`;

const getAllAttribute = gql`
query GetAllAttribute{
  getAllAttribute{
    value: _id
    label: name
    children: value{
      value: _id
      label: name
      type: type_option
    }
	}
}
`;

const getAllProduct = gql`
query GetProduct($pageNumber: Int, $product_ids: [ID], ){
  getProduct(pageNumber: $pageNumber, product_ids: $product_ids,){
    key: _id
    name
    product_code
    img_url
    price
    promotion_percent
    final_price
    stock_status
    categories{
    category_level1{
    name
    }
    category_level2{
    name
    }
    category_level3{
    name
    }
    }
    record_status
    option_amount{
    amount
    }
  }
}
`;

const searchProductQuery = gql`
query SearchProduct($text: String!, $pageNumber: Int!){
  searchProduct(text: $text, pageNumber: $pageNumber){
    key: _id
    name
    product_code
    img_url
    price
    promotion_percent
    final_price
    stock_status
    categories{
    category_level1{
    name
    }
    category_level2{
    name
    }
    category_level3{
    name
    }
    }
    record_status
    option_amount{
    amount
    }
  }
}
`;
export {accountLoginQuery, getPermissionQuery, getIdPermissionQuery, getAllCategories, getAllAttribute, getAllProduct, searchProductQuery};