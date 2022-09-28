import React from 'react';

type PropsForm = {
  newProduct: string;
  setNewProduct: React.Dispatch<React.SetStateAction<string>>;
  createProduct: (e: React.SyntheticEvent) => void;
};

const FormProduct = ({
  newProduct,
  setNewProduct,
  createProduct
}: PropsForm) => {
  return (
    <>
      <div>
        <form onSubmit={createProduct}>
          <input
            type='text'
            value={newProduct}
            placeholder='Your product...'
            onChange={e => setNewProduct(e.target.value)}
          />
          <button>Save Product 💾</button>
        </form>
      </div>
    </>
  );
};

export default FormProduct;
