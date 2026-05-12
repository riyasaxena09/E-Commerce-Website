import { Outlet } from "react-router-dom";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";

export const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
