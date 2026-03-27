import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react";

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
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.discountPrice ?? item.price) * item.qty,
    0
  );
const navigate = useNavigate();
const handleCheckout = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    navigate("/orders"); // ✅ go to orders page
  } else {
    navigate("/login"); // ❌ redirect to login
  }
};
  const FREE_SHIPPING = 5000;
  const SHIPPING_COST = 250;

  const isFreeShipping = subtotal >= FREE_SHIPPING;
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING) * 100, 100);

  const total =
    cart.length === 0
      ? 0
      : subtotal + (isFreeShipping ? 0 : SHIPPING_COST);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🔲 Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* 🛒 Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* 🧾 Header */}
            <div className="p-5 border-b flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">
                  Your Cart ({cart.length})
                </h2>
              </div>

              <button onClick={onClose}>
                <X />
              </button>
            </div>

            {/* 🚚 Shipping */}
            <div className="px-5 py-4 bg-gray-50 border-b">
              <div className="flex items-center gap-2 text-xs mb-2">
                <Truck size={14} />
                <span>
                  {isFreeShipping
                    ? "Free Shipping Unlocked 🎉"
                    : `Add ₹${(FREE_SHIPPING - subtotal).toLocaleString(
                        "en-IN"
                      )} for free shipping`}
                </span>
              </div>

              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  className="h-full bg-black"
                />
              </div>
            </div>

            {/* 📦 Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center mt-20">
                  <ShoppingBag
                    className="mx-auto text-gray-300 mb-4"
                    size={40}
                  />
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => {
                  const price = item.discountPrice ?? item.price;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-3 border p-3 rounded-xl"
                    >
                      <img
                        src={item.thumbnail}
                        className="w-16 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="text-sm font-semibold line-clamp-1">
                              {item.name}
                            </h4>

                            <button onClick={() => onRemove(item.id)}>
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <p className="text-xs text-gray-400">
                            ₹{price.toLocaleString("en-IN")} × {item.qty}
                          </p>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          {/* Qty */}
                          <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-full">
                            <button onClick={() => onDecrease(item.id)}>
                              <Minus size={12} />
                            </button>

                            <span className="text-xs font-semibold">
                              {item.qty}
                            </span>

                            <button onClick={() => onIncrease(item.id)}>
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="text-sm font-bold">
                            ₹{(price * item.qty).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* 💳 Footer */}
            <div className="p-5 border-t">
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {isFreeShipping ? "Free" : `₹${SHIPPING_COST}`}
                  </span>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

            <button
  onClick={handleCheckout}
  disabled={cart.length === 0}
  className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 disabled:bg-gray-300"
>
  Checkout <ArrowRight size={16} />
</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}