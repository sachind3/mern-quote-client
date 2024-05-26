import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { actionLogin } from "../../redux/features/userSlice";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { error, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let emailError = "";
    let passwordError = "";
    if (!info.email) {
      emailError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(info.email)) {
      emailError = "Email address is invalid";
    }
    if (!info.password) {
      passwordError = "Password is required";
    } else if (info.password.length < 6) {
      passwordError = "Password must be at least 6 characters";
    }
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      setErrors({ email: "", password: "" });
      dispatch(actionLogin(info))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.error("Failed to login:", err);
        });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <Helmet>
        <title>Login | QuoteHub</title>
        <link
          rel="canonical"
          href={`https://quote-client.sachindesai.in/user/login`}
        />
      </Helmet>
      <div className="card max-w-sm mx-auto mt-4">
        <h3 className="text-2xl font-semibold mb-3">Login here!</h3>
        <form onSubmit={handleSubmit} className="space-y-3 mb-2">
          <div className="form-group ">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>
          <div className="form-group ">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={info.password}
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>
          <div className="text-sm text-right ">
            <Link to="/user/forgot" className="underline">
              Forgot password
            </Link>
          </div>
          <button type="submit" className="btn w-full">
            Sign In
          </button>
        </form>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/user/register" className="underline">
            Register here!
          </Link>
        </div>
      </div>
    </>
  );
};
export default Login;
