import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <div className="fixed inset-0 flex justify-center w-full h-full">
        <div className="bg-shape1 bg-pink-600 opacity-50 blur-[90px]"></div>
        <div className="bg-shape2 bg-blue-600 opacity-50 blur-[90px]"></div>
        <div className="bg-shape1 bg-purple-600 opacity-50 blur-[90px]"></div>
      </div>
      <Header />
      <section className="py-4 relative z-30">
        <div className="max-w-5xl mx-auto px-4">
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
};
export default Layout;
