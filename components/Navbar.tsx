"use client";
import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "./ui/button";
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((a, e) => a + e.quantity, 0);

  // useEffect(() => {
  //   const handleResize = () => setMobileOpen(window.innerWidth <= 768);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
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

        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            className="md:hidden size-12 p-0"
            onClick={() => setMobileOpen((p) => !p)}
          >
            {mobileOpen ? (
              <XMarkIcon className="size-full" />
            ) : (
              <Bars3Icon className="size-full" />
            )}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md h-[20vh]">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link
                href="/"
                className="block hover:text-blue-600 font-semibold"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="block hover:text-blue-600 font-semibold"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="block hover:text-blue-600 font-semibold"
              >
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};

export default Navbar;
