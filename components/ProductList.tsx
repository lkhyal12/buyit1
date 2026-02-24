"use client";
import { useState } from "react";
import Stripe from "stripe";
import ProductCard from "./ProductCard";

interface Props {
  products: Stripe.Product[];
}
const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredProducts = products.filter((product) => {
    const trimmedSearchTerm = searchTerm.trim().toLocaleLowerCase();
    const nameMatch = product.name.toLowerCase().includes(trimmedSearchTerm);
    const descriptionMatch =
      product?.description?.includes(trimmedSearchTerm) || false;
    return nameMatch || descriptionMatch;
  });
  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, index) => {
          return (
            <li key={index}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
