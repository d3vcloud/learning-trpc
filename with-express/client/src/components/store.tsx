import React, { useState } from 'react';
import { Product } from '../types';
import { trpc } from '../utils/trpc';
import FormProduct from './form-product';
import ListProducts from './list-products';
import Placeholder from './placeholder';

const Store = () => {
  const productsQuery = trpc.useQuery(['getProducts']);
  const addProduct = trpc.useMutation(['createProduct']);
  const client = trpc.useContext();
  const products = productsQuery.data?.products;

  const [newProduct, setNewProduct] = useState('');

  if (productsQuery.isLoading) {
    return <h1>Loading...</h1>;
  }

  const createProduct = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const lastPrice = products ? products[0].price + 10 : 0 + 10;
    const product: Product = {
      id: +Date.now(),
      name: newProduct,
      price: lastPrice
    };
    addProduct.mutate(product, {
      onSuccess(value) {
        client.invalidateQueries(['getProducts']);
      }
    });
    setNewProduct('');
  };

  return (
    <>
      <header
        className='container'
        style={{
          padding: 'calc(1rem * 4) 0'
        }}
      >
        <h1>Store tRPC 🛒</h1>
      </header>
      <main className='container'>
        <section id='cart'>
          <div className='grid'>
            <FormProduct
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              createProduct={createProduct}
            />
            {products ? <ListProducts products={products} /> : <Placeholder />}
          </div>
        </section>
      </main>
    </>
  );
};

export default Store;
