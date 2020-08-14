import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import { fetchProductBySlug } from '../../lib/api';
import { Product } from '../../lib/types';

interface PageProps {
  loading: boolean;
  product?: Product;
}

const ProductPage: React.FC = () => {
  const [props, setProps] = useState<PageProps>({
    loading: true,
  });
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    async function fetchProduct() {
      const newProduct = await fetchProductBySlug(
        Array.isArray(slug) ? slug[0] : slug,
      );
      setProps({
        loading: false,
        product: newProduct,
      });
    }

    if (slug) fetchProduct();
  }, [slug]);

  const { loading, product } = props;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return <div>{product.fields.title}</div>;
};

export default ProductPage;
