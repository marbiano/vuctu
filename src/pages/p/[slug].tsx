import { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import DefaultErrorPage from 'next/error';
import { fetchAllProducts, fetchProductBySlug } from '../../lib/api';
import { Product } from '../../lib/types';

interface PageProps {
  product?: Product;
}

const ProductPage: React.FC<PageProps> = ({ product }) => {
  if (!product) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return <div>{product.fields.title}</div>;
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
    fallback: false,
  };
};

export default ProductPage;
