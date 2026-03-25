import { Outlet, useLocation } from "react-router-dom";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import { CmsProvider } from "../../context/CmsContext";

export default function PublicLayout() {
  const location = useLocation();

  // 👇 Hide layout for /shop and all nested routes
  const isShopPage = location.pathname.startsWith("/shop");

  return (
    <CmsProvider>
      <div className="min-h-screen bg-black">
        {!isShopPage && <PublicHeader />}

        <main className={`flex-1 ${!isShopPage ? "pt-20" : ""}`}>
          <Outlet />
        </main>

        {!isShopPage && <PublicFooter />}
      </div>
    </CmsProvider>
  );
}