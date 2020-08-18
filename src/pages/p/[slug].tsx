import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import { useQuery } from 'react-query';
import { fetchAllProducts, fetchProductBySlug } from '../../lib/api';
import { Product } from '../../lib/types';
import Layout from '../../components/Layout';

interface PageProps {
  product?: Product;
}

const ProductPage: React.FC<PageProps> = ({ product }) => {
  const router = useRouter();
  const { query, isFallback } = router;
  const slug = Array.isArray(query.slug) ? query.slug[0] : query.slug;

  const { isLoading, error, data } = useQuery(['product', slug], (key, slug) =>
    fetch(`/api/p/${slug}`).then((res) => res.json()),
  );

  if (isFallback) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const { fields } = product;
  return (
    <Layout>
      <div className="grid grid-cols-9 gap-8">
        <div className="col-span-2">
          <h1>{fields.title}</h1>
          <div>
            {isLoading
              ? 'Loading status...'
              : data.status === 'available'
              ? 'Available'
              : 'Not Available'}
          </div>
        </div>
        <div className="col-span-7">
          <img src={fields.media[0].url} />
        </div>
      </div>
    </Layout>
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
