import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddProduct from './addProduct';
import ListProducts from './ListProducts';


const Product = () => {
  return (
    <div style={{ width: '100%' }}>
      <div>
        {/* <Switch> */}
          {/* <Route exact path="/products" component={ListProducts} /> */}
          {/* <Route exact path="/products/addProduct" component={AddProduct} /> */}
        {/* </Switch> */}
        <ListProducts/>
      </div>
    </div >
  );
}

export default Product;