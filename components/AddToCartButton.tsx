"use client";

type CartItem = {
  id: string;
  name: string;
  price_kobo: number;
  image_url?: string;
  qty: number;
};

function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem("swiftbite_cart");
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem("swiftbite_cart", JSON.stringify(cart));
}

export default function AddToCartButton({
  item,
}: {
  item: {
    id: string;
    name: string;
    price_kobo: number;
    image_url?: string;
  };
}) {

  function handleAddToCart() {

    const cart = getCart();

    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {

      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, qty: cartItem.qty + 1 }
          : cartItem
      );

      saveCart(updatedCart);

    } else {

      const updatedCart = [
        ...cart,
        {
          id: item.id,
          name: item.name,
          price_kobo: item.price_kobo,
          image_url: item.image_url,
          qty: 1,
        },
      ];

      saveCart(updatedCart);

    }

    alert(`${item.name} added to cart`);
  }

  return (
    <button
      onClick={handleAddToCart}
      className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-700"
    >
      Add to Cart
    </button>
  );
}