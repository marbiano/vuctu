import { GetStaticProps } from 'next';
import Link from 'next/link';
import { fetchAllProducts } from '../lib/api';
import { Product } from '../lib/types';
import ProductsGrid from '../components/ProductsGrid';
import Layout from '../components/Layout';

interface PageProps {
  products: Product[];
}

const IndexPage: React.FC<PageProps> = ({ products }) => {
  if (products.length === 0) {
    return <div>There are no available products</div>;
  }

  return (
    <Layout>
      <ProductsGrid products={products} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const products = await fetchAllProducts();
  return {
    props: {
      products,
    },
    revalidate: 1,
  };
};

export default IndexPage;
