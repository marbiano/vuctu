import Link from 'next/link';
import { Product } from '../../lib/types';
import styles from './styles.module.css';

const ProductsGrid: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <ul className="grid grid-cols-3 gap-8 row-gap-16">
      {products.map(({ id, fields }) => (
        <li key={id}>
          <Link href={`/p/${fields.slug}`}>
            <a>
              <div className={styles.box}>
                <img
                  className={styles['box-image']}
                  src={fields.media[0].url}
                />
              </div>
              <div className="mt-4 text-gray-600">{fields.title}</div>
              <div>${fields.price}</div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProductsGrid;
