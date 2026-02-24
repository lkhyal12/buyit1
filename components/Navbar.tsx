import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky z-50 top-0 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <h2 className="logo">
          <Link href="/" className="hover:text-blue-600 font-bold text-2xl">
            BUYIT
          </Link>
        </h2>

        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-600 font-semibold">
            Home
          </Link>
          <Link href="/checkout" className="hover:text-blue-600 font-semibold">
            Checkout
          </Link>
          <Link href="/products" className="hover:text-blue-600 font-semibold">
            Products
          </Link>
        </div>

        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
