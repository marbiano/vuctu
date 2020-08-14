import { GetStaticProps } from 'next';
import Link from 'next/link';
import { fetchAllProducts } from '../lib/api';
import { Product } from '../lib/types';

interface PageProps {
  products: Product[];
}

const IndexPage: React.FC<PageProps> = ({ products }) => {
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
