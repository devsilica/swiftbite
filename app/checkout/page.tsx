"use client";

import { formatNaira } from "@/lib/format";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type CartItem = {
  id: string;
  name: string;
  price_kobo: number;
  image_url?: string;
  qty: number;
};

export default function CheckoutPage() {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("swiftbite_cart");
    if (raw) {
      setCartItems(JSON.parse(raw));
    }
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price_kobo * item.qty,
    0
  );

  async function placeOrder() {

    if (!name || !phone || !address) {
      alert("Please fill all required fields");
      return;
    }

    if (loading) return;

    setLoading(true);

    /* CREATE ORDER */

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: name,
        phone,
        address,
        notes,
        total_kobo: total,
        payment_status: "unpaid",
        order_status: "pending",
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("ORDER ERROR:", orderError);
      alert(orderError?.message || "Failed to create order");
      setLoading(false);
      return;
    }

    /* INSERT ORDER ITEMS */

      const items = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        price_kobo: item.price_kobo,
        quantity: item.qty,
      }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(items);

    if (itemsError) {
      console.error("ITEMS ERROR:", itemsError);
      alert(itemsError.message || "Failed to save order items");
      setLoading(false);
      return;
    }

    /* CLEAR CART */

    localStorage.removeItem("swiftbite_cart");

    /* DATE + TIME */

    const now = new Date();

    const date = now.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const time = now.toLocaleTimeString("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
    });

    /* ORDER REFERENCE */

    const reference = `SB-${order.id.slice(0,8)}`;

    /* TRACKING LINK */

    const trackingLink =
      `${window.location.origin}/track/${reference}`;

    /* WHATSAPP MESSAGE */

    const message = `
🍽️ *New SwiftBite Order*

🆔 Order ID: ${reference}

👤 Customer: ${name}
📞 Phone: ${phone}
📍 Address: ${address}

🧾 *Order Details*
${cartItems
  .map(
    (item) =>
      `• ${item.qty}x ${item.name} — ${formatNaira(item.price_kobo * item.qty)}`
  )
  .join("\n")}

💰 *Total:* ${formatNaira(total)}

🔎 *Track Order*
${trackingLink}

📅 Date: ${date}
🕒 Time: ${time}

-------------------------
Sent via SwiftBite
`;

    const restaurantNumber = "2347042953337";

    const whatsappUrl =
      `https://wa.me/${restaurantNumber}?text=${encodeURIComponent(message)}`;

    /* OPEN WHATSAPP */

    window.open(whatsappUrl, "_blank");

    /* REDIRECT USER */

    window.location.href = `/order-success?order=${reference}`;
  }

  return (
    <main className="min-h-screen bg-[#fafafa] py-16 px-6">

      <div className="max-w-6xl mx-auto mb-12">
        <p className="text-sm bg-orange-100 text-orange-600 inline-block px-3 py-1 rounded-full">
          SwiftBite Checkout
        </p>

        <h1 className="text-4xl font-bold mt-4">
          Almost there, <span className="text-orange-600">complete your order.</span>
        </h1>

        <p className="text-gray-500 mt-2">
          Enter your delivery details and confirm your order.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* DELIVERY DETAILS */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Delivery Details
          </h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-orange-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-orange-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <textarea
              placeholder="Delivery Address"
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-orange-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <textarea
              placeholder="Order Notes (Optional)"
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-orange-500"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

          </div>
        </div>

        {/* ORDER SUMMARY */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 h-fit">

          <h2 className="text-2xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>
                  {formatNaira(item.price_kobo * item.qty)}
                </span>
              </div>
            ))}

          </div>

          <div className="border-t mt-6 pt-6 flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatNaira(total)}</span>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading || cartItems.length === 0}
            className="w-full mt-8 bg-black text-white py-4 rounded-xl text-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          <button
            onClick={() => window.location.href = "/"}
            className="w-full mt-3 border border-gray-200 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition"
          >
            Back to Menu
          </button>

        </div>

      </div>

    </main>
  );
}