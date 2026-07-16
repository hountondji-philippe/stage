import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader"; // Ajuste le nom si nécessaire
import PublicFooter from "./PublicFooter";

export default function PublicLayout() {
  return (
    <div className="app-container">
      <PublicHeader />
      <main>
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}