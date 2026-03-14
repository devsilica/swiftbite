import { supabase } from "@/lib/supabaseClient";
import OrderProgress from "@/components/OrderProgress";

export const dynamic = "force-dynamic";

export default async function TrackOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const shortCode = id.replace("SB-", "");

  const { data, error } = await supabase.rpc(
    "find_order_by_short_code",
    { short_code: shortCode }
  );

  const order = data?.[0];

  function getEstimate(status: string) {
    switch (status) {
      case "pending":
        return "25 – 40 minutes";
      case "preparing":
        return "20 – 30 minutes";
      case "ready":
        return "10 – 20 minutes";
      case "on_the_way":
        return "5 – 10 minutes";
      case "delivered":
        return "Delivered";
      default:
        return "Calculating...";
    }
  }

  function getStatusMessage(status: string) {
    switch (status) {
      case "pending":
        return "🧾 Your order has been received.";
      case "preparing":
        return "👨‍🍳 Your food is being prepared.";
      case "ready":
        return "📦 Your order is ready for pickup.";
      case "on_the_way":
        return "🚚 Your rider is on the way.";
      case "delivered":
        return "🎉 Your order has been delivered.";
      default:
        return "Processing your order...";
    }
  }

  const timeline = buildTimeline(order)

  function buildTimeline(order: any) {
  const timeline = []

  if (order.created_at) {
    timeline.push({
      label: "Order placed",
      time: new Date(order.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    })
  }

  if (order.order_status === "preparing" ||
      order.order_status === "ready" ||
      order.order_status === "on_the_way" ||
      order.order_status === "delivered") {
    timeline.push({
      label: "Preparing food",
      time: "In progress",
    })
  }

  if (order.order_status === "ready" ||
      order.order_status === "on_the_way" ||
      order.order_status === "delivered") {
    timeline.push({
      label: "Ready for pickup",
      time: "Completed",
    })
  }

  if (order.order_status === "on_the_way" ||
      order.order_status === "delivered") {
    timeline.push({
      label: "Rider on the way",
      time: "In transit",
    })
  }

  if (order.order_status === "delivered") {
    timeline.push({
      label: "Delivered",
      time: "Completed",
    })
  }

  return timeline
}

  if (!order || error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">
            Order not found
          </h1>

          <p className="text-gray-500 text-sm">
            Please check your tracking link.
          </p>
        </div>
      </main>
    );
  }

  const orderCode = `SB-${order.id.slice(0, 8)}`;
  const status = order.order_status || "pending";

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-16 flex justify-center">

      <div className="w-full max-w-3xl space-y-8">

        {/* Header */}

        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Track Your Order
          </h1>

          <p className="text-gray-500 mt-2">
            Order #{orderCode}
          </p>
        </div>

        {/* Order Info Card */}

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">

          <div className="flex justify-between items-center">

            <div>
           <p className="text-lg font-semibold capitalize">
  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
    {status.replaceAll("_", " ")}
  </span>
</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">
                Order Code
              </p>

              <p className="font-semibold">
                {orderCode}
              </p>
            </div>

          </div>

        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">

  <h3 className="text-lg font-semibold mb-4">
    Order Timeline
  </h3>

  <div className="space-y-4">

    {timeline.map((item, i) => (

      <div key={i} className="flex justify-between items-center">

        <p className="text-sm font-medium">
          {item.label}
        </p>

        <span className="text-xs text-gray-500">
          {item.time}
        </span>

      </div>

    ))}

  </div>

</div>

        {/* Estimated Delivery */}

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm text-center">

          <p className="text-sm text-gray-500">
            Estimated Delivery
          </p>

          <p className="text-2xl font-semibold text-orange-600 mt-1">
            {getEstimate(status)}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            Delivery time may vary depending on traffic or kitchen workload.
          </p>

        </div>

        {/* Status Message */}

        <div className="text-center">

          <p className="text-lg font-medium">
            {getStatusMessage(status)}
          </p>

        </div>

        {/* Progress Tracker */}

        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">

          <OrderProgress status={status} />

        </div>

        {/* Delivery Message */}

        <div className="text-center text-sm text-gray-500">

          {status === "pending" && (
            <p>Your order has been received and is waiting confirmation.</p>
          )}

          {status === "confirmed" && (
            <p>Your order has been confirmed and will be prepared shortly.</p>
          )}

          {status === "preparing" && (
            <p>Your food is currently being prepared.</p>
          )}

          {status === "on_the_way" && (
            <p>Your order is on the way 🚚</p>
          )}

          {status === "delivered" && (
            <p>Your order has been delivered. Enjoy your meal! 🍽️</p>
          )}

        </div>

      </div>

    </main>
  );
}