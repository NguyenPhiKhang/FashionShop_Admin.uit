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
export {accountLoginQuery, getPermissionQuery, getIdPermissionQuery, getAllCategories, getAllAttribute};