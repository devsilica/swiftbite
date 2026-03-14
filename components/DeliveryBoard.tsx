"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { formatNaira } from "@/lib/format";

export default function DeliveryBoard() {

  const [orders, setOrders] = useState<any[]>([]);

  async function loadOrders() {

    const { data } = await supabase
      .from("orders")
      .select(`
  *,
  order_items (
    product_name,
    quantity
  )
`)
      .in("order_status", ["ready", "on_the_way"])
      .order("created_at", { ascending: true });

    setOrders(data || []);
  }

  async function updateStatus(id: string, status: string) {

    await supabase
      .from("orders")
      .update({ order_status: status })
      .eq("id", id);

    loadOrders();
  }

  useEffect(() => {

    loadOrders();

    const channel = supabase
      .channel("delivery-orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        () => {
          loadOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  const ready = orders.filter(o => o.order_status === "ready");
  const onTheWay = orders.filter(o => o.order_status === "on_the_way");

  return (

    <div className="grid md:grid-cols-2 gap-8">

      {/* READY */}

      <Column
        title="Ready for Pickup"
        orders={ready}
        action="on_the_way"
        actionLabel="Start Delivery"
        updateStatus={updateStatus}
      />

      {/* ON THE WAY */}

      <Column
        title="On The Way"
        orders={onTheWay}
        action="delivered"
        actionLabel="Mark Delivered"
        updateStatus={updateStatus}
      />

    </div>

  );
}

function Column({ title, orders, action, actionLabel, updateStatus }: any) {

  return (

    <div className="bg-white border rounded-2xl p-6">

      <h2 className="text-lg font-bold mb-4">
        {title}
      </h2>

      <div className="space-y-4">

        {orders.map((order: any) => (

          <div
            key={order.id}
            className="border rounded-xl p-4 shadow-sm"
          >


            <p className="font-bold text-lg">
              SB-{order.id.slice(0,8)}
            </p>

            <div className="mb-3 space-y-1">

  {order.order_items?.map((item: any, i: number) => (

    <p key={i} className="text-sm font-medium">

      {item.quantity}x {item.product_name}

    </p>

  ))}

</div>

            <p className="text-sm text-gray-500">
              {order.customer_name}
            </p>

            <p className="text-sm text-gray-500">
              {order.address}
            </p>

<div className="flex gap-2 mt-3">

  {/* Call Button */}

  <a
    href={`tel:${order.phone}`}
    className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-500 transition"
  >
    Call
  </a>

  {/* WhatsApp Button */}

  <a
    href={`https://wa.me/234${order.phone.slice(1)}`}
    target="_blank"
    className="flex-1 text-center bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-400 transition"
  >
    WhatsApp
  </a>

</div>
            <p className="font-semibold mt-2">
              {formatNaira(order.total_kobo)}
            </p>

            <button
              onClick={() => updateStatus(order.id, action)}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              {actionLabel}
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}