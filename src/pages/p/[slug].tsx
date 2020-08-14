import { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import { fetchAllProducts, fetchProductBySlug } from '../../lib/api';
import { Product } from '../../lib/types';

interface PageProps {
  product?: Product;
}

const ProductPage: React.FC<PageProps> = ({ product }) => {
  const router = useRouter();
  const { query, isFallback } = router;
  const { slug } = query;
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    async function fetchProduct() {
      const newProduct = await fetchProductBySlug(
        Array.isArray(slug) ? slug[0] : slug,
      );

      setStatus(newProduct.fields.status);
    }

    if (slug && !isFallback) fetchProduct();
  }, [slug, isFallback]);

  if (isFallback) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const { fields } = product;

  return (
    <div>
      <h1>{fields.title}</h1>
      <div>
        {status
          ? status === 'available'
            ? 'Available'
            : 'Not Available'
          : 'Loading status...'}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const product = await fetchProductBySlug(
    Array.isArray(slug) ? slug[0] : slug,
  );

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await fetchAllProducts();
  return {
    paths: products.map((product) => ({
      params: { slug: product.fields.slug },
    })),
    fallback: true,
  };
};

export default ProductPage;
