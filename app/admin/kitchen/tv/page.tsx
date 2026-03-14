import KitchenBoard from "@/components/KitchenBoard";
import KitchenFullscreen from "@/components/KitchenFullscreen";

export const dynamic = "force-dynamic";

export default function KitchenTVPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">

      <KitchenFullscreen />

      <h1 className="text-3xl font-bold mb-6">
        SwiftBite Kitchen Display
      </h1>

      <KitchenBoard />

    </main>
  );
}