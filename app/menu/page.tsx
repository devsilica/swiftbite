import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import AddToCartButton from "@/components/AddToCartButton";

type Category = {
  id: string;
  name: string;
  sort_order: number;
};

type MenuItem = {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price_kobo: number;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
};

function formatNairaFromKobo(kobo: number) {
  const naira = kobo / 100;
  return `₦${naira.toLocaleString()}`;
}

export default async function MenuPage() {

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  const { data: items } = await supabase
    .from("menu_items")
    .select("*")
    .order("sort_order", { ascending: true });

  const categoriesSafe: Category[] = categories ?? [];
  const itemsSafe: MenuItem[] = items ?? [];

  return (

    <main className="min-h-screen bg-[#f8f6f2] text-black">

      {/* HERO */}

      <section className="border-b border-black/10 bg-white/70 backdrop-blur">

        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

            <div>

              <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-700">
                SwiftBite Specials
              </span>

              <h1 className="mt-5 text-5xl font-bold md:text-6xl">
                Good food,
                <span className="text-orange-600"> delivered fast.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base text-gray-600 md:text-lg">
                Explore freshly prepared meals, satisfying swallows,
                and chilled drinks arranged for a premium food-ordering experience.
              </p>

            </div>

            <div>

              <Link
                href="/cart"
                className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
              >
                View Cart
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* MENU */}

      <section className="mx-auto max-w-7xl px-6 py-14">

        {categoriesSafe.length === 0 ? (

          <p className="text-gray-600">
            No categories found
          </p>

        ) : (

          <div className="space-y-16">

            {categoriesSafe.map((category) => {

              const categoryItems = itemsSafe.filter(
                (item) => item.category_id === category.id
              );

              return (

                <section key={category.id}>

                  {/* CATEGORY HEADER */}

                  <div>

                    <h2 className="text-3xl font-bold">
                      {category.name}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Curated picks in our {category.name.toLowerCase()} menu
                    </p>

                  </div>

                  {/* ITEMS */}

                  {categoryItems.length === 0 ? (

                    <p className="mt-4 text-sm text-gray-500">
                      No items in this category yet.
                    </p>

                  ) : (

                    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                      {categoryItems.map((item) => (

                        <div
                          key={item.id}
                          className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm hover:-translate-y-1 hover:shadow-xl transition"
                        >

                          {/* IMAGE */}

                          <div className="relative h-48 overflow-hidden">

                            <img
                              src={item.image_url || "/food-placeholder.jpg"}
                              alt={item.name}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                            {/* PRICE BADGE */}

                            <div className="absolute top-3 right-3 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white shadow">
                              {formatNairaFromKobo(item.price_kobo)}
                            </div>

                          </div>

                          {/* CONTENT */}

                          <div className="p-6">

                            <h3 className="text-lg font-semibold">
                              {item.name}
                            </h3>

                            <p className="mt-2 text-sm text-gray-600">
                              {item.description || "Freshly prepared meal."}
                            </p>

                            <div className="mt-6 flex items-center justify-between">

                              <span className="text-sm text-gray-500">
                                {item.is_available
                                  ? "Available now"
                                  : "Unavailable"}
                              </span>

                              {item.is_available ? (

                                <AddToCartButton
                                  item={{
                                    id: item.id,
                                    name: item.name,
                                    price_kobo: item.price_kobo,
                                    image_url: item.image_url || undefined,
                                  }}
                                />

                              ) : (

                                <span className="rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-600">
                                  Sold Out
                                </span>

                              )}

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  )}

                </section>

              );
            })}

          </div>

        )}

      </section>

    </main>

  );
}