import { FaRegUser } from "react-icons/fa";
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
    <header className="bg-white/50 backdrop-blur sticky top-0 shadow-sm py-2 z-50 border-b border-b-slate-200">
      <div className="max-w-6xl px-4 mx-auto flex items-center justify-between">
        <Link to="/" className="text-orange-500 font-extrabold text-2xl">
          <span className="text-amber-500">Quote</span>Hub
        </Link>
        <div className="flex items-center gap-3">
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
