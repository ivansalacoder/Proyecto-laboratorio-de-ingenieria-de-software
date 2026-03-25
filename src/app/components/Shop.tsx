import { useState } from "react";
import { Link } from "react-router";
import { BookOpen } from "lucide-react";
import { useShop } from "../store/ShopContext";
import { Catalog } from "./shop/Catalog";
import { Reservations } from "./shop/Reservations";
import { History } from "./shop/History";
import { CartSidebar } from "./shop/CartSidebar";
import { CheckoutModal } from "./shop/CheckoutModal";
import { Toast } from "./shop/Toast";

type ShopTab = "catalog" | "reservations" | "history";

export function Shop() {
  const { cart, reservations, openCart } = useShop();
  const [tab, setTab] = useState<ShopTab>("catalog");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const activeReservations = reservations.filter(r => r.status === "active").length;

  const TABS: { key: ShopTab; label: string; badge?: number }[] = [
    { key: "catalog", label: "Catálogo" },
    { key: "reservations", label: "Reservas", badge: activeReservations },
    { key: "history", label: "Historial" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEFAE0" }}>

      <header className="sticky top-0 z-[200]" style={{ background: "#fff", boxShadow: "0 2px 20px rgba(74,55,40,0.10)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-4">

          <Link to="/home" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#4A3728" }}>
              <BookOpen className="w-5 h-5" style={{ color: "#D4A373" }} />
            </div>
            <h2 className="hidden sm:block font-medium whitespace-nowrap" style={{ color: "#4A3728" }}>
              Biblioteca Digital
            </h2>
          </Link>

          <nav className="flex gap-1 rounded-xl p-1 mx-auto" style={{ background: "#F5EDD3" }}>
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                style={
                  tab === t.key
                    ? { background: "#fff", color: "#4A3728", boxShadow: "0 2px 8px rgba(74,55,40,0.12)" }
                    : { color: "#6B5344" }
                }
              >
                {t.label}
                {t.badge ? (
                  <span
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center px-1"
                    style={{ background: "#606C38", color: "#fff" }}
                  >
                    {t.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={openCart}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
              style={{ background: "#4A3728" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" style={{ color: "#FEFAE0" }}>
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center px-1"
                  style={{ background: "#C0392B", color: "#fff" }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <Link to="/profile">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ background: "#606C38" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" width="18" height="18">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
              </div>
            </Link>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tab === "catalog" && <Catalog />}
        {tab === "reservations" && <Reservations />}
        {tab === "history" && <History />}
      </main>

      <CartSidebar onCheckout={() => setCheckoutOpen(true)} />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={() => setTab("history")}
      />

      <Toast />

    </div>
  );
}
