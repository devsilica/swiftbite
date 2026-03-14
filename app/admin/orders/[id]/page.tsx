import { supabase } from "@/lib/supabaseClient";
import { formatNaira } from "@/lib/format";
import StatusBadge from "@/components/StatusBadge";
import PaymentBadge from "@/components/PaymentBadge";
import StatusDropdown from "@/components/StatusDropdown";

export const dynamic = "force-dynamic";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id: orderId } = await params;

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  return (
    <main className="min-h-screen bg-[#f6f6f6] py-12 px-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-3xl font-bold">
              Order #{order ? `SB-${order.id.slice(0,8)}` : ""}
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              {order?.created_at
                ? new Date(order.created_at).toLocaleString()
                : ""}
            </p>

          </div>

          {/* STATUS BADGES */}

          <div className="flex items-center gap-3">

            <StatusBadge status={order?.order_status} />

            <PaymentBadge status={order?.payment_status} />

          </div>

        </div>


        {/* CUSTOMER + ADDRESS */}

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">

            <h2 className="font-semibold text-lg mb-4">
              Customer Information
            </h2>

            <p className="text-sm">
              <span className="text-gray-500">Name</span><br />
              {order?.customer_name}
            </p>

            <p className="text-sm mt-3">
              <span className="text-gray-500">Phone</span><br />
              {order?.phone}
            </p>

          </div>


          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">

            <h2 className="font-semibold text-lg mb-4">
              Delivery Address
            </h2>

            <p className="text-sm">
              {order?.address}
            </p>

          </div>

        </div>


        {/* ORDER ITEMS */}

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">

          <div className="p-6 border-b flex justify-between">

            <h2 className="font-semibold text-lg">
              Order Items
            </h2>

            <span className="text-sm text-gray-400">
              {items?.length || 0} items
            </span>

          </div>


          <div className="p-6 space-y-4">

            {items?.map((item) => (

              <div
                key={item.id}
                className="flex justify-between items-center"
              >

                <div>

                  <p className="font-medium">
                    {item.product_name}
                  </p>

                  <p className="text-xs text-gray-400">
                    Quantity: {item.quantity}
                  </p>

                </div>

                <div className="font-semibold">
                  {formatNaira(item.price_kobo * item.quantity)}
                </div>

              </div>

            ))}

          </div>


          {/* TOTAL */}

          <div className="border-t px-6 py-4 flex justify-between font-semibold text-lg">

            <span>Total</span>

            <span>
              {order ? formatNaira(order.total_kobo) : ""}
            </span>

          </div>

        </div>


        {/* QUICK STATUS CONTROL */}

        <div className="mt-6">

          <h3 className="text-sm text-gray-500 mb-2">
            Update Order Status
          </h3>

          <StatusDropdown
            orderId={order?.id}
            currentStatus={order?.order_status}
          />

        </div>

      </div>

    </main>
  );
}