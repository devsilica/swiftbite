"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatNaira } from "@/lib/format";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order");
  const total = searchParams.get("total");

  const restaurantPhone = "2347042953337";

  const message = `
SwiftBite Order

Order ID: ${orderId}

Total: ${formatNaira(Number(total))}

A customer has placed a new order.
Please confirm payment and delivery details.
`;

  const whatsappLink = `https://wa.me/${restaurantPhone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <main className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center">

        {/* Success Icon */}

        <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-3xl">
          🎉
        </div>

        {/* Title */}

        <h1 className="text-3xl font-bold mt-8 leading-tight">
          Order placed{" "}
          <span className="text-orange-600">successfully</span>
        </h1>

        {/* Subtitle */}

        <p className="text-gray-500 mt-3 text-sm">
          Your order has been received and is being processed.
        </p>

        {/* Primary Button */}

        {orderId && (
          <Link
            href={`/track/${orderId}`}
            className="block w-full bg-orange-600 text-white py-4 rounded-xl mt-8 font-medium hover:opacity-90 transition"
          >
            Track Order
          </Link>
        )}

        {/* Order Info */}

        <div className="mt-6 bg-gray-50 rounded-xl p-4 text-sm text-gray-700 space-y-2">

          {orderId && (
            <p>
              <span className="font-medium">Order ID:</span> {orderId}
            </p>
          )}

          {total && (
            <p>
              <span className="font-medium">Total:</span>{" "}
              {formatNaira(Number(total))}
            </p>
          )}

        </div>

        {/* WhatsApp Note */}

        <p className="mt-6 text-gray-500 text-sm">
          Continue the order conversation on{" "}
          <span className="text-orange-600 font-medium">
            WhatsApp
          </span>.
        </p>

        {/* Actions */}

        <div className="mt-6 space-y-3">

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-500 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Open WhatsApp
          </a>

          <Link
            href="/"
            className="block w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </main>
  );
}