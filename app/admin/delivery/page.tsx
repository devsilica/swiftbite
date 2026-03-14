import DeliveryBoard from "@/components/DeliveryBoard";

export const dynamic = "force-dynamic";

export default function DeliveryPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">
        Delivery Board
      </h1>

      <DeliveryBoard />
    </main>
  );
}