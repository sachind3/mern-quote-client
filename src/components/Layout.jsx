import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <section className="main-section">
        <div className="container">
          <Outlet />
        </div>
      </section>
    </>
  );
};
export default Layout;
