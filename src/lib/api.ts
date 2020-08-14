import { Product } from '../lib/types';

const AIRTABLE_API_URL = `https://api.airtable.com/v0`;
const AIRTABLE_BASE_ID =
  process.env.AIRTABLE_BASE_ID || process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME =
  process.env.AIRTABLE_TABLE_NAME ||
  process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME;
const AIRTABLE_API_KEY =
  process.env.AIRTABLE_API_KEY || process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const AIRTABLE_ENDPOINT = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

interface Data {
  records: Product[];
}
async function fetchAPI(params = {}) {
  const res = await fetch(
    `${AIRTABLE_ENDPOINT}?${new URLSearchParams(params).toString()}`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    },
  );

  if (res.status !== 200) {
    console.log(await res.text());
    throw new Error('Failed to fetch API');
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json;
}

export async function fetchAllProducts() {
  const data: Data = await fetchAPI({
    filterByFormula: `{status} = 'available'`,
  });

  return data?.records || [];
}

export async function fetchProductBySlug(slug: string) {
  const data: Data = await fetchAPI({
    filterByFormula: `AND({slug} = '${slug}', OR({status} = 'available', {status} = 'sold'))`,
  });

  return data?.records.length > 0 ? data.records[0] : null;
}
