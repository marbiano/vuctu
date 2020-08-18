import Link from 'next/link';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container mx-auto mt-32 grid grid-cols-12 gap-8">
      <div className="col-span-9">{children}</div>
      <div className="col-start-11 col-span-2">
        <div>
          <Link href="/">
            <a>Vuctu</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
