import KitchenBoard from "@/components/KitchenBoard";

export const dynamic = "force-dynamic";

export default function KitchenPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <KitchenBoard />
    </main>
  );
}