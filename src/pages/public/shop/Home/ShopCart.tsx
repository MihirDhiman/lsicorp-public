import React from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  thumbnail: string;
  qty: number;
};

type ShopCartProps = {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function ShopCart({
  cart,
  isOpen,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
}: ShopCartProps) {
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const total = cart.reduce(
    (acc, item) =>
      acc + (item.discountPrice || item.price) * item.qty,
    0
  );

  return (
    <>
      {/* 🔥 Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* 🛒 Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold text-lg">
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={onClose}
            className="text-xl hover:text-red-500"
          >
            ✖
          </button>
        </div>

        {/* ITEMS */}
        <div className="p-4 space-y-4 overflow-y-auto h-[65%]">
          {cart.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              Your cart is empty 🛒
            </p>
          )}

          {cart.map((item) => {
            const price = item.discountPrice || item.price;

            return (
              <div
                key={item.id}
                className="flex gap-3 border p-3 rounded-xl items-center"
              >
                {/* Image */}
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1">
                  <h4 className="text-sm font-semibold line-clamp-1">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-600">
                    ₹{price} × {item.qty}
                  </p>

                  <p className="font-semibold text-sm">
                    ₹{price * item.qty}
                  </p>

                  {/* Qty Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onDecrease(item.id)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span className="text-sm">{item.qty}</span>

                    <button
                      onClick={() => onIncrease(item.id)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 text-xs mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t bg-white">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total</span>
            <span className="font-semibold">₹{total}</span>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}