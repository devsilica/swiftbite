import { supabase } from "@/lib/supabaseClient";
import { formatNaira } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function PrintOrderPage({
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
    <main className="p-6 bg-white text-black font-mono">

      <script
        dangerouslySetInnerHTML={{
          __html: "setTimeout(() => window.print(), 500);",
        }}
      />

      <div className="max-w-sm mx-auto">

        <h1 className="text-center text-lg font-bold mb-4">
          SwiftBite Order
        </h1>

        <div className="text-center mb-4">
          SB-{order?.id.slice(0,8)}
        </div>

        <hr className="mb-4"/>

        {items?.map((item) => (

          <div key={item.id} className="flex justify-between mb-1">

            <span>
              {item.quantity}x {item.product_name}
            </span>

            <span>
              {formatNaira(item.price_kobo * item.quantity)}
            </span>

          </div>

        ))}

        <hr className="my-4"/>

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatNaira(order?.total_kobo || 0)}</span>
        </div>

        <hr className="my-4"/>

        <p>Customer: {order?.customer_name}</p>
        <p>Phone: {order?.phone}</p>
        <p>Address: {order?.address}</p>

        <hr className="my-4"/>

        <p className="text-center text-sm">
          Thank you for your order
        </p>

      </div>

    </main>
  );
}