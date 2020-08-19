import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <div className="sticky top-0 pt-16">
      <Link href="/">
        <a
          className="text-4xl uppercase font-display"
          style={{ letterSpacing: '0.2em' }}
        >
          Vuctu
        </a>
      </Link>
      <p className="text-l text-gray-600">Un marketplace simple.</p>
      <div className="mt-16">
        <Link href="/publica">
          <a className="btn-oranged">Publicá</a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
