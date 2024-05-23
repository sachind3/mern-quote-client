import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Create from "./pages/quote/Create";
import Detail from "./pages/quote/Detail";
import MyQuotes from "./pages/quote/MyQuotes";
import Update from "./pages/quote/Update";
import ActivateEmail from "./pages/user/ActivateEmail";
import ForgotPassword from "./pages/user/ForgotPassword";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import Register from "./pages/user/Register";
import ResetPassword from "./pages/user/ResetPassword";
import {
  actionGetAllQuotes,
  actionGetMyQuotes,
} from "./redux/features/quoteSlice";
import {
  actionGetUserInfo,
  actionRefreshToken,
} from "./redux/features/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const { isLogin, token } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLogin || localStorage.getItem("firstLogin")) {
      dispatch(actionRefreshToken());
    }
  }, [isLogin, dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(actionGetUserInfo());
      dispatch(actionGetAllQuotes());
      dispatch(actionGetMyQuotes());
    }
  }, [token, dispatch]);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/forgot" element={<ForgotPassword />} />
        <Route path="/user/reset/:token" element={<ResetPassword />} />
        <Route path="/user/activate/:token" element={<ActivateEmail />} />
        <Route path="/quote/detail/:id" element={<Detail />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/quote/create" element={<Create />} />
          <Route path="/quote/update/:id" element={<Update />} />
          <Route path="/quote/myquotes" element={<MyQuotes />} />
          <Route path="/user/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
export default App;
