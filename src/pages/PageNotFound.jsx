import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page404">
      <h1>404</h1>
      <p className="fs-2 mb-2">Page not found</p>
      <Link to="/" className="btn btn-dark">
        Back to home
      </Link>
    </div>
  );
};
export default PageNotFound;
