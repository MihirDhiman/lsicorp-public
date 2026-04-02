import { useEffect, useState } from "react";
import { orderService } from "../../../api/api";
import ShopNav from "./ShopNav";
import toast from "react-hot-toast";

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  string,
  { label: string; dot: string; pill: string; text: string }
> = {
  PENDING: {
    label: "Pending",
    dot: "#f59e0b",
    pill: "rgba(245,158,11,0.1)",
    text: "#b45309",
  },
  COMPLETED: {
    label: "Completed",
    dot: "#10b981",
    pill: "rgba(16,185,129,0.1)",
    text: "#065f46",
  },
  CANCELLED: {
    label: "Cancelled",
    dot: "#ef4444",
    pill: "rgba(239,68,68,0.1)",
    text: "#991b1b",
  },
  PROCESSING: {
    label: "Processing",
    dot: "#6366f1",
    pill: "rgba(99,102,241,0.1)",
    text: "#3730a3",
  },
};

function getStatus(status: string) {
  return (
    STATUS_CONFIG[status] ?? {
      label: status,
      dot: "#6b7280",
      pill: "rgba(107,114,128,0.1)",
      text: "#374151",
    }
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: 16,
        padding: "20px 24px",
        animation: "pulse 1.6s ease-in-out infinite",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ width: 140, height: 14, background: "#e5e7eb", borderRadius: 6, marginBottom: 8 }} />
          <div style={{ width: 90, height: 11, background: "#f3f4f6", borderRadius: 6 }} />
        </div>
        <div style={{ width: 72, height: 24, background: "#f3f4f6", borderRadius: 20 }} />
      </div>
      <div style={{ width: "100%", height: 1, background: "#f3f4f6", margin: "12px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: 60, height: 11, background: "#f3f4f6", borderRadius: 6 }} />
        <div style={{ width: 80, height: 20, background: "#e5e7eb", borderRadius: 6 }} />
      </div>
    </div>
  );
}

// ─── Order Card ───────────────────────────────────────────────────────────────
function OrderCard({
  order,
  onClick,
  index,
}: {
  order: any;
  onClick: () => void;
  index: number;
}) {
  const st = getStatus(order.status);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.86)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: hovered ? "1px solid rgba(0,0,0,0.11)" : "1px solid rgba(0,0,0,0.07)",
        borderRadius: 18,
        padding: "22px 24px",
        cursor: "pointer",
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 36px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
        animationDelay: `${index * 55}ms`,
        animation: "slideUp 0.38s ease both",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Status color bar at top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${st.dot}55,${st.dot},${st.dot}55)`, borderRadius: "18px 18px 0 0", opacity: 0.75 }} />

      {/* Top: order number + pill */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, paddingTop: 4 }}>
        <div style={{ minWidth: 0, flex: 1, marginRight: 10 }}>
          <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700, fontSize: 14.5, color: "#111827", letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 3 }}>
            {order.order_number}
          </p>
          <p style={{ fontSize: 11, color: "#9ca3af" }}>
            {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: st.pill, color: st.text, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.05em", padding: "4px 10px", borderRadius: 20, textTransform: "uppercase" as const, flexShrink: 0 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.dot, display: "inline-block" }} />
          {st.label}
        </span>
      </div>

      {/* Grand Total — hero number */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase" as const, letterSpacing: "0.07em", fontWeight: 600, marginBottom: 4 }}>Grand Total</p>
        <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 28, fontWeight: 700, color: "#111827", lineHeight: 1 }}>
          ₹{order.grand_total.toLocaleString()}
        </p>
      </div>

      {/* Stat chips: subtotal / tax / shipping */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[["Subtotal", `₹${order.subtotal}`], ["Tax", `₹${order.tax}`], ["Shipping", `₹${order.shipping_fee}`]].map(([l, v]) => (
          <div key={l} style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.05)", borderRadius: 10, padding: "9px 13px", flex: 1 }}>
            <p style={{ fontSize: 9, color: "#9ca3af", textTransform: "uppercase" as const, letterSpacing: "0.06em", fontWeight: 600, marginBottom: 3 }}>{l}</p>
            <p style={{ fontSize: 12.5, color: "#374151", fontWeight: 600 }}>{v}</p>
          </div>
        ))}
      </div>

      {/* Item preview (first 2) */}
      {order.items && order.items.length > 0 && (
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: 13, marginBottom: 4 }}>
          <p style={{ fontSize: 9.5, color: "#9ca3af", textTransform: "uppercase" as const, letterSpacing: "0.07em", fontWeight: 600, marginBottom: 8 }}>Items</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {order.items.slice(0, 2).map((item: any, i: number) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: 12, color: "#374151", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "65%" }}>
                  {item.product_name || `Product #${item.product_id}`}
                </p>
                <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 12.5, color: "#111827", flexShrink: 0 }}>
                  ₹{(item.line_total || item.price || 0).toLocaleString()}
                </p>
              </div>
            ))}
            {order.items.length > 2 && (
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                +{order.items.length - 2} more item{order.items.length - 2 > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Footer: view hint */}
      <div style={{ marginTop: "auto", paddingTop: 12, display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11, color: "#9ca3af", display: "flex", alignItems: "center", gap: 4 }}>
          View full order
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function OrderModal({ order, onClose }: { order: any; onClose: () => void }) {
  const st = getStatus(order.status);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: 20,
        animation: "fadeIn 0.2s ease",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: 20,
          width: "100%",
          maxWidth: 560,
          maxHeight: "88vh",
          overflowY: "auto",
          boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
          border: "1px solid rgba(255,255,255,0.7)",
          animation: "slideUp 0.25s ease",
          position: "relative",
        }}
      >
        {/* Shimmer top bar */}
        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg, ${st.dot}33, ${st.dot}, ${st.dot}33)`,
            borderRadius: "20px 20px 0 0",
          }}
        />

        <div style={{ padding: "28px 32px" }}>
          {/* Close btn */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.1)",
              background: "rgba(0,0,0,0.04)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7280",
              fontSize: 14,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.09)";
              (e.currentTarget as HTMLButtonElement).style.color = "#111827";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.04)";
              (e.currentTarget as HTMLButtonElement).style.color = "#6b7280";
            }}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ marginBottom: 20 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: st.pill,
                color: st.text,
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.07em",
                padding: "3px 10px",
                borderRadius: 20,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: st.dot, display: "inline-block" }} />
              {st.label}
            </span>

            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#111827",
                letterSpacing: "-0.02em",
                marginBottom: 4,
              }}
            >
              {order.order_number}
            </h3>

            <p style={{ fontSize: 12.5, color: "#9ca3af" }}>
              {new Date(order.created_at).toLocaleString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Grand total highlight */}
          <div
            style={{
              background: "rgba(17,24,39,0.04)",
              borderRadius: 12,
              padding: "14px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <p style={{ fontSize: 12, color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 600 }}>
              Grand Total
            </p>
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 28,
                fontWeight: 700,
                color: "#111827",
                letterSpacing: "-0.02em",
              }}
            >
              ₹{order.grand_total}
            </p>
          </div>

          {/* Breakdown grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 24,
            }}
          >
            {[
              { label: "Subtotal", val: order.subtotal },
              { label: "Tax", val: order.tax },
              { label: "Discount", val: order.discount_total },
              { label: "Shipping", val: order.shipping_fee },
            ].map(({ label, val }) => (
              <div
                key={label}
                style={{
                  background: "rgba(0,0,0,0.02)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  border: "1px solid rgba(0,0,0,0.04)",
                }}
              >
                <p style={{ fontSize: 10.5, color: "#9ca3af", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                  {label}
                </p>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#374151" }}>₹{val}</p>
              </div>
            ))}
          </div>

          {/* Items */}
          {order.items && order.items.length > 0 && (
            <>
              <div
                style={{
                  height: 1,
                  background: "linear-gradient(90deg, rgba(0,0,0,0.07), transparent)",
                  marginBottom: 18,
                }}
              />
              <h4
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#9ca3af",
                  marginBottom: 12,
                }}
              >
                Items
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {order.items.map((item: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 14px",
                      borderRadius: 10,
                      background: i % 2 === 0 ? "rgba(0,0,0,0.02)" : "transparent",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 13.5, fontWeight: 600, color: "#111827", marginBottom: 2 }}>
                        {item.product_name || `Product #${item.product_id}`}
                      </p>
                      <p style={{ fontSize: 11.5, color: "#9ca3af" }}>Qty: {item.quantity}</p>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      ₹{item.line_total || item.price || 0}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Notes */}
          {order.notes && (
            <div
              style={{
                marginTop: 20,
                padding: "12px 16px",
                background: "rgba(245,158,11,0.06)",
                border: "1px solid rgba(245,158,11,0.15)",
                borderRadius: 10,
              }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, color: "#b45309", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
                Note
              </p>
              <p style={{ fontSize: 13, color: "#78350f" }}>{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ShopOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  const fetchOrders = async () => {
    try {
      const res = await orderService.getOrders(1, 10);
      const data = res.data.orders || res.data.data || [];
      const sorted = data.sort((a: any, b: any) => b.order_id - a.order_id);
      setOrders(sorted);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const statuses = ["ALL", ...Array.from(new Set(orders.map((o) => o.status))) as string[]];
  const filtered = filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

  return (
    <>
      <style>{`
       
        @keyframes slideUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.55} }
        body { background: linear-gradient(160deg,#f0f2f8 0%,#e8eaf4 100%); }
      `}</style>

      <ShopNav totalItems={0} onCartClick={() => {}} />

      {/* Ambient blobs */}
      <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, left: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.07), transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", top: 200, right: "10%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.05), transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "30px 24px 60px", position: "relative", zIndex: 1 }}>

        {/* Page header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>
            Account
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 36,
              fontWeight: 700,
              color: "#111827",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            My Orders
          </h1>

          {/* Filter tabs */}
          {!loading && orders.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {statuses.map((s) => {
                const active = filter === s;
                const st = s !== "ALL" ? getStatus(s) : null;
                return (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    style={{
                      padding: "5px 14px",
                      borderRadius: 20,
                      border: active ? "1px solid rgba(17,24,39,0.2)" : "1px solid rgba(0,0,0,0.08)",
                      background: active ? "#111827" : "rgba(255,255,255,0.7)",
                      color: active ? "#fff" : "#6b7280",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      cursor: "pointer",
                      transition: "all 0.18s",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {st && (
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: active ? "#fff" : st.dot, display: "inline-block" }} />
                    )}
                    {s === "ALL" ? "All Orders" : getStatus(s).label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 24px",
              background: "rgba(255,255,255,0.6)",
              borderRadius: 20,
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <p style={{ fontSize: 40, marginBottom: 12 }}>📦</p>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
              No orders found
            </p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>
              {filter !== "ALL" ? `No ${getStatus(filter).label.toLowerCase()} orders yet.` : "You haven't placed any orders yet."}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: 10,
            }}
          >
            {filtered.map((order, i) => (
              <OrderCard
                key={order.order_id}
                order={order}
                index={i}
                onClick={() => setSelectedOrder(order)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </>
  );
}