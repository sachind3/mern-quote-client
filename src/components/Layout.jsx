import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <div className="gradientShape">
        <div className="bg-shape1 bg-teal opacity-50 bg-blur"></div>
        <div className="bg-shape2 bg-primary opacity-50 bg-blur"></div>
        <div className="bg-shape1 bg-purple opacity-50 bg-blur"></div>
      </div>
      <Header />
      <section className="main-section">
        <div className="container">
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
};
export default Layout;
