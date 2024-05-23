import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="text-center fs-small">
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
