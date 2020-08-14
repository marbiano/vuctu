const AIRTABLE_API_URL = `https://api.airtable.com/v0`;
const AIRTABLE_ENDPOINT = `${AIRTABLE_API_URL}/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/${process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME}`;

async function fetchAPI(params = {}) {
  const res = await fetch(
    `${AIRTABLE_ENDPOINT}?${new URLSearchParams(params).toString()}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
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
  const data = await fetchAPI({
    filterByFormula: `{status} = 'available'`,
  });

  return data?.records ? data.records.map((p) => p.fields) : [];
}

export async function fetchProductBySlug(slug: string) {
  console.log('slug', slug);
  const data = await fetchAPI({
    filterByFormula: `AND({slug} = '${slug}', {status} = 'available')`,
  });

  return data?.records.length > 0 ? data.records[0].fields : { error: 404 };
}
