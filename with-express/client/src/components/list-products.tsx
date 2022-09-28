import { Product } from '../types';

type PropsList = {
  products: Product[];
};

const ListProducts = ({ products }: PropsList) => {
  return (
    <div>
      <h2>List of products</h2>
      <ul>
        {products.map(p => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListProducts;
