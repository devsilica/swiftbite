"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { formatNaira } from "@/lib/format";

export default function KitchenBoard() {

  const [orders, setOrders] = useState<any[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    .in("order_status", ["pending", "preparing", "ready"])
    .order("created_at", { ascending: true });

  setOrders(data || []);
}

  async function updateStatus(id: string, status: string) {
    await supabase
      .from("orders")
      .update({ order_status: status })
      .eq("id", id);
  }

  useEffect(() => {

    audioRef.current = new Audio("/new-order.mp3");

    loadOrders();

    const channel = supabase
      .channel("kitchen-orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        (payload) => {

          if (payload.eventType === "INSERT") {
            audioRef.current?.play().catch(() => {});
          }

          loadOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  const pending = orders.filter(o => o.order_status === "pending");
  const preparing = orders.filter(o => o.order_status === "preparing");
  const ready = orders.filter(o => o.order_status === "ready");

  return (

    <div className="grid lg:grid-cols-3 gap-8">

      <Column
        title="Pending"
        color="orange"
        orders={pending}
        action="preparing"
        actionLabel="Start Preparing"
        updateStatus={updateStatus}
      />

      <Column
        title="Preparing"
        color="yellow"
        orders={preparing}
        action="ready"
        actionLabel="Mark Ready"
        updateStatus={updateStatus}
      />

      <Column
        title="Ready"
        color="green"
        orders={ready}
        action="on_the_way"
        actionLabel="Out for Delivery"
        updateStatus={updateStatus}
      />

    </div>

  );
}

function Column({ title, orders, action, actionLabel, updateStatus, color }: any) {

  const headerColor = {
    orange: "text-orange-400",
    yellow: "text-yellow-400",
    green: "text-green-400"
  }[color];

  return (

    <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6 flex flex-col h-[80vh]">

      {/* Column Header */}

      <div className="flex justify-between items-center mb-6">

        <h2 className={`text-2xl font-bold ${headerColor}`}>
          {title}
        </h2>

        <span className="bg-gray-800 text-sm px-3 py-1 rounded-full">
          {orders.length}
        </span>

      </div>

      {/* Orders */}

      <div className="space-y-6 overflow-y-auto pr-2">

        {orders.map((order: any) => (

          <div
            key={order.id}
            className="bg-white text-black rounded-xl p-6 shadow-xl"
          >

            {/* Order ID */}

            <div className="flex justify-between items-center mb-2">

              <p className="font-bold text-2xl">
                SB-{order.id.slice(0,8)}
              </p>

              <span className="text-xs text-gray-500">
                #{order.id.slice(0,4)}
              </span>

 <div className="mb-4 space-y-1">

  {order.order_items?.map((item: any, i: number) => (

    <p key={i} className="text-sm font-medium">

      {item.quantity}x {item.product_name}

    </p>

  ))}

</div>

            </div>

            {/* Customer */}

            <p className="text-lg text-gray-500 mb-3">
              {order.customer_name}
            </p>



            {/* Price */}

            <p className="text-3xl font-bold text-orange-600 mb-5">
              {formatNaira(order.total_kobo)}
            </p>

            {/* Action */}

            <button
              onClick={() => updateStatus(order.id, action)}
              className="w-full py-4 rounded-lg text-lg text-white font-semibold bg-orange-600 hover:bg-orange-500 transition"
            >
              {actionLabel}
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}