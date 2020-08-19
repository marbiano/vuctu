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
        <div className="col-span-2 mt-16">
          <div className="sticky top-0 pt-16">
            <h1>{fields.title}</h1>
            <div className="font-bold mt-2">${fields.price}</div>
            {fields.description && (
              <div className="text-sm text-gray-700 mt-6">
                {fields.description}
              </div>
            )}
            <div className="text-sm mt-12">
              <span className="text-gray-600">Vende:</span>{' '}
              <a
                href={`https://twitter.com/${fields.user}`}
                target="_blank"
                className="text-gray-700 hover:text-blue-500 hover:underline"
              >
                {fields.user}
              </a>
            </div>
            <div className="mt-4">
              {isLoading ? null : data.status === 'available' ? (
                <a
                  href={fields.reference}
                  target="_blank"
                  className="btn-black"
                >
                  Negociar
                </a>
              ) : (
                <span className="btn-disabled">Vendido</span>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-7 mt-32">
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
