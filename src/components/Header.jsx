import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actionLogout } from "../redux/features/userSlice";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useSelector((state) => state.user);

  const dropdownRef = useRef();

  const handleLogout = () => {
    dispatch(actionLogout());
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white/50 backdrop-blur sticky top-0 shadow-sm z-50 border-b border-b-slate-200 ">
      <div className="max-w-6xl px-4 mx-auto flex items-center justify-between h-12">
        <Link to="/" className="text-orange-500 font-extrabold text-2xl">
          <span className="text-amber-500">Quote</span>Hub
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-80 relative">
            <input
              type="text"
              className="form-control !text-xs"
              placeholder="Search"
            />
            <button className="absolute right-2 top-2">
              <BiSearch />
            </button>
          </div>
          {user ? (
            <>
              <div
                className="relative cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
                ref={dropdownRef}
              >
                <FaRegUser className="text-xl" />
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      className="card !bg-white absolute w-44 text-sm flex flex-col gap-3 right-0 top-8"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link to="/user/profile">
                        <div className="line-clamp-1">Sachin Desai</div>
                        <div className="line-clamp-1 text-xs">
                          desai.sachin45@gmail.com
                        </div>
                      </Link>
                      <Link to="/quote/myquotes">My Quotes</Link>
                      <Link to="/quote/create">Add a quote</Link>
                      <button
                        onClick={handleLogout}
                        className="flex gap-2 items-center text-red-600"
                      >
                        <MdLogout /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
