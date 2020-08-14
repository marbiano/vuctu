import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchAllProducts } from '../lib/api';
import { Product } from '../lib/types';

interface PageProps {
  loading: boolean;
  products: Product[];
}

const IndexPage: React.FC = () => {
  const [props, setProps] = useState<PageProps>({
    loading: true,
    products: [],
  });

  useEffect(() => {
    async function fetchProducts() {
      const newProducts = await fetchAllProducts();
      setProps({
        loading: false,
        products: newProducts,
      });
    }

    fetchProducts();
  }, []);

  const { loading, products } = props;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>There are no available products</div>;
  }

  return (
    <ul>
      {products.map(({ id, fields }) => (
        <li key={id}>
          <Link href={`/p/${fields.slug}`}>
            <a>{fields.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default IndexPage;
