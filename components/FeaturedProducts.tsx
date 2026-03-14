import { supabase } from "@/lib/supabaseClient"
import { formatNaira } from "@/lib/format"
import Link from "next/link"

export default async function FeaturedProducts() {

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .limit(4)

  return (

    <section className="bg-surface-50">

      <div className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-3xl font-bold mb-10">
          Popular Meals
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {products?.map((product) => (

            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="bg-surface-100 border border-border rounded-xl overflow-hidden hover:shadow-lg transition"
            >

              <img
                src={product.image_url}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">

                <p className="font-semibold">
                  {product.name}
                </p>

                <p className="text-brand-500 font-medium mt-1">
                  {formatNaira(product.price_kobo)}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>

  )

}