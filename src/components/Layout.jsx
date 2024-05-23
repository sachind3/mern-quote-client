import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
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
