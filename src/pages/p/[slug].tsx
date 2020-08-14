import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchProductBySlug } from '../../lib/airtable';
import DefaultErrorPage from 'next/error';

export default function Product() {
  const [product, setProduct] = useState();
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    async function fetchProduct() {
      const newProduct = await fetchProductBySlug(
        Array.isArray(slug) ? slug[0] : slug,
      );
      setProduct(newProduct);
    }

    if (slug) fetchProduct();
  }, [slug]);

  // Product is loading
  if (!product) {
    return <div>Loading...</div>;
  }

  // Product doesn't exist
  if (product.error === 404) {
    return <DefaultErrorPage statusCode={product.error} />;
  }

  return <div>{product.title}</div>;
}
