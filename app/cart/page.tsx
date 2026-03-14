"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price_kobo: number;
  image_url?: string;
  qty: number;
};

function formatNairaFromKobo(kobo: number) {
  return `₦${(kobo / 100).toLocaleString()}`;
}

export default function CartPage() {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("swiftbite_cart");
    if (raw) {
      setCartItems(JSON.parse(raw));
    }
  }, []);

  function updateCart(updatedCart: CartItem[]) {
    setCartItems(updatedCart);
    localStorage.setItem("swiftbite_cart", JSON.stringify(updatedCart));
  }

  function increaseQty(id: string) {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );

    updateCart(updatedCart);
  }

  function decreaseQty(id: string) {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);

    updateCart(updatedCart);
  }

  function removeItem(id: string) {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  }

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price_kobo * item.qty,
      0
    );
  }, [cartItems]);

  return (
    <main className="min-h-screen bg-[#f8f6f2] text-black">

      {/* HEADER */}

      <section className="border-b border-black/10 bg-white/70 backdrop-blur">

        <div className="mx-auto max-w-6xl px-6 py-14">

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>

              <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-700">
                SwiftBite Cart
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Your order,
                <span className="text-orange-600"> almost ready.</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
                Review your selected meals, adjust quantities, and continue to
                checkout when you're ready.
              </p>

            </div>

            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium transition hover:bg-black hover:text-white"
            >
              Back to Menu
            </Link>

          </div>

        </div>

      </section>


      {/* CART */}

      <section className="mx-auto max-w-6xl px-6 py-12">

        {cartItems.length === 0 ? (

          <div className="mx-auto mt-8 max-w-2xl rounded-[2rem] border border-black/10 bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-3xl">
              🛒
            </div>

            <h2 className="mt-6 text-2xl font-semibold tracking-tight">
              Your cart is empty
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Looks like you haven't added anything yet.
            </p>

            <Link
              href="/menu"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-700"
            >
              Browse Menu
            </Link>

          </div>

        ) : (

          <div className="grid gap-8 lg:grid-cols-[1.5fr_0.85fr]">

            {/* CART ITEMS */}

            <div className="space-y-5">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition"
                >

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex flex-1 gap-4">

                      {/* FOOD IMAGE */}

                      <img
                        src={item.image_url || "/food-placeholder.jpg"}
                        alt={item.name}
                        className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                      />

                      <div className="min-w-0">

                        <h2 className="text-lg font-semibold tracking-tight">
                          {item.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          Premium meal selection
                        </p>

                        <p className="mt-3 text-sm font-medium text-gray-700">
                          {formatNairaFromKobo(item.price_kobo)} each
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm font-medium text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>

                  </div>


                  {/* QUANTITY */}

                  <div className="mt-6 flex flex-col gap-4 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-[#f8f6f2] text-lg font-medium hover:bg-gray-200"
                      >
                        −
                      </button>

                      <div className="min-w-[52px] rounded-full bg-black px-4 py-2 text-center text-sm font-semibold text-white">
                        {item.qty}
                      </div>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-[#f8f6f2] text-lg font-medium hover:bg-gray-200"
                      >
                        +
                      </button>

                    </div>

                    <div className="text-left sm:text-right">

                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Line Total
                      </p>

                      <p className="mt-1 text-lg font-semibold">
                        {formatNairaFromKobo(item.price_kobo * item.qty)}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>


            {/* ORDER SUMMARY */}

            <aside className="h-fit rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm lg:sticky lg:top-6">

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-semibold tracking-tight">
                  Order Summary
                </h2>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                  {cartItems.length} item{cartItems.length > 1 ? "s" : ""}
                </span>

              </div>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Confirm your meals and continue to checkout.
              </p>

              <div className="mt-8 space-y-4 rounded-2xl bg-[#f8f6f2] p-5">

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {formatNairaFromKobo(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium text-gray-500">
                    Calculated at checkout
                  </span>
                </div>

              </div>

              <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">

                <span className="text-base font-semibold">
                  Estimated Total
                </span>

                <span className="text-2xl font-bold">
                  {formatNairaFromKobo(subtotal)}
                </span>

              </div>

              <Link
                href="/checkout"
                className="mt-7 block rounded-full bg-black px-6 py-3.5 text-center text-sm font-medium text-white hover:bg-gray-800"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/menu"
                className="mt-3 block rounded-full border border-black/10 bg-white px-6 py-3 text-center text-sm font-medium hover:bg-black hover:text-white"
              >
                Add More Items
              </Link>

            </aside>

          </div>

        )}

      </section>

    </main>
  );
}