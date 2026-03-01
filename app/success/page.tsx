"use client";
import { getCheckoutSession } from "@/actions/getCheckoutSession";
import { useCartStore } from "@/store/cartStore";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return;
    async function verfyingPayment() {
      const session = await getCheckoutSession(sessionId!);
      if (session.payment_status === "paid") {
        console.log("paid");
        clearCart();
      }
    }
    verfyingPayment();
  }, [searchParams, clearCart]);
  return (
    <div className="text-green-500 text-3xl font-bold text-center py-20">
      Proccessing Payment...
    </div>
  );
};

export default SuccessPage;
