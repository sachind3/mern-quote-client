import { Link } from "react-router-dom";
import { PiGooglePhotosLogoBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { actionLogout } from "../redux/features/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(actionLogout());
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <PiGooglePhotosLogoBold color="white" size={30} />
        </Link>
        <div className="navbar">
          {user ? (
            <>
              <Link to="/quote/create">Add a quote</Link>
              <Link to="/quote/myquotes">My quotes</Link>
              <Link to="/user/profile">{user.name}</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/user/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
