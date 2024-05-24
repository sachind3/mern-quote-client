import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[25vw]">404</h1>
      <p className="text-2xl mb-2">Page not found</p>
      <Link to="/" className="btn">
        Back to home
      </Link>
    </div>
  );
};
export default PageNotFound;
