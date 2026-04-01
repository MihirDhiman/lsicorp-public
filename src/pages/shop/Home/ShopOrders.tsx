import { useEffect, useState } from "react";
import { orderService } from "../../../api/api";
import ShopNav from "./ShopNav";
import toast from "react-hot-toast";

export default function ShopOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await orderService.getOrders(1, 10);

      // adjust based on backend response
      setOrders(res.data.orders || res.data.data || []);

    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load orders ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <>
      <ShopNav totalItems={0} onCartClick={() => {}} />

      <div className="p-6 max-w-4xl mx-auto mt-[80px]">
        <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div
                key={order.id}
                className="bg-white p-5 rounded-xl shadow border"
              >
                {/* Top */}
                <div className="flex justify-between mb-3">
                  <div>
                    <p className="font-semibold">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>

                  <span className="text-sm px-3 py-1 rounded-full bg-gray-100">
                    {order.status || "Pending"}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        Product #{item.product_id}
                      </span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                {order.notes && (
                  <p className="text-sm text-gray-500 mt-3">
                    Note: {order.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}