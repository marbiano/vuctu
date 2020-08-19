import Layout from '../components/Layout';

const SellPage: React.FC = () => {
  return (
    <Layout>
      <div className="mt-24">
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/shrC2cljAFfwaAEls?backgroundColor=orange"
          frameBorder="0"
          width="100%"
          height="900"
          style={{ background: 'transparent' }}
        ></iframe>
      </div>
    </Layout>
  );
};

export default SellPage;
