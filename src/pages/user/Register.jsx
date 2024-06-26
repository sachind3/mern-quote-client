import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { actionRegister } from "../../redux/features/userSlice";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { error, user } = useSelector((state) => state.user);
  const [messageShow, setMessageShow] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    if (!info.name) {
      nameError = "Full name is required";
    }

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
    if (nameError || emailError || passwordError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
      });
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      setErrors({ name: "", email: "", password: "" });
      dispatch(actionRegister(info))
        .unwrap()
        .then((data) => {
          console.log(data);
          setMessageShow(true);
          setInfo({
            name: "",
            email: "",
            password: "",
          });
        })
        .catch((err) => {
          console.error("Failed to register:", err);
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
        <title>Register | QuoteHub</title>
        <link
          rel="canonical"
          href={`https://quote-client.sachindesai.in/user/register`}
        />
      </Helmet>
      <div className="card max-w-sm mx-auto mt-4">
        <h3 className="text-2xl font-semibold mb-3">Register here!</h3>
        {messageShow && (
          <div className="successMessageAlert">
            Register success! Please activate your email to start.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3 mb-2">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
            />
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
          <button type="submit" className="btn w-full">
            Sign Up
          </button>
        </form>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/user/login" className="underline">
            Login here!
          </Link>
        </div>
      </div>
    </>
  );
};
export default Register;
