import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import { CmsProvider } from "../../context/CmsContext";

export default function PublicLayout() {
  return (
    <CmsProvider>
      <div className="min-h-screen bg-black">
        <PublicHeader />

        <main className="flex-1 pt-20">
          <Outlet />
        </main>

        <PublicFooter />
      </div>
    </CmsProvider>
  );
}