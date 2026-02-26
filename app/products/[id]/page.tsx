import ProductDetails from "@/components/ProductDetails";
import { stripe } from "@/lib/stripe";
import React from "react";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const productId = (await params).id;
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });
  const plainProduct = JSON.parse(JSON.stringify(product));
  return <ProductDetails product={plainProduct} />;
};

export default ProductPage;
