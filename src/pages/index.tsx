import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchAllProducts } from '../lib/airtable';

export default function Home() {
  const [products, setProducts] = useState();

  useEffect(() => {
    async function fetchProducts() {
      const newProducts = await fetchAllProducts();
      setProducts(newProducts);
    }

    fetchProducts();
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>There are no available products</div>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.slug}>
          <Link href={`/p/${product.slug}`}>
            <a>{product.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
