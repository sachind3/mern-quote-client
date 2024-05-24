import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-3 bg-slate-50 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center text-sm">
          &copy; QuoteHub {new Date().getFullYear()} All rights reserved |
          Design & developed by{" "}
          <Link to="https://github.com/sachind3" target="_blank">
            SACHIN DESAI
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
