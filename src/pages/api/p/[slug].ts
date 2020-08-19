import { NextApiRequest, NextApiResponse } from 'next';
import { fetchProductBySlug } from '../../../lib/api';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { slug } = query;

  const product = await fetchProductBySlug(
    Array.isArray(slug) ? slug[0] : slug,
  );

  if (!product) res.status(404);
  res.status(200).json({ status: product?.fields.status });
};

export default handler;
