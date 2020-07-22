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

const getAllCategoriesQuery = gql`
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

const getAllAttributeQuery = gql`
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

const getAllProductQuery = gql`
query GetProduct($pageNumber: Int){
  getProduct(pageNumber: $pageNumber){
    total_record
    products{
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
}
`;

const getProductQuery = gql`
query GetProductById($id: ID!){
  getProductById(id: $id){
    key: _id
    name
    product_code
    images
    price
    promotion_percent
    final_price
    stock_status
    is_freeship
    description
    weight
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
      option_color{
        _id
        name
      }
      option_size{
        _id
        name
      }
      amount
    }
  }
}
`;

const searchProductQuery = gql`
query SearchProduct($text: String!, $pageNumber: Int!){
  searchProduct(text: $text, pageNumber: $pageNumber){
    total_record
    products{
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
}
`;
export { accountLoginQuery, getPermissionQuery, getIdPermissionQuery, getAllCategoriesQuery, getAllAttributeQuery, getAllProductQuery, searchProductQuery, getProductQuery };