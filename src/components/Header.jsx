import { FaRegUser } from "react-icons/fa";
import { GiOvermind } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
          <GiOvermind color="#F7471B" size={30} />
        </Link>
        <div className="navbar">
          {user ? (
            <>
              <Link to="/quote/create">Add a quote</Link>
              <Link to="/quote/myquotes">My quotes</Link>
              <Link to="/user/profile">
                <FaRegUser />
              </Link>
              <button onClick={handleLogout}>
                <MdLogout />
              </button>
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
