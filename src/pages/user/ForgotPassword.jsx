import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { actionForgotPassword } from "../../redux/features/userSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [errMessage, setErrMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const from = location.state?.from?.pathname || "/";
  const { error, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  const [info, setInfo] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const validate = () => {
    let emailError = "";
    if (!info.email) {
      emailError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(info.email)) {
      emailError = "Email address is invalid";
    }

    if (emailError) {
      setErrors({ email: emailError });
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      setErrors({ email: "" });
      dispatch(actionForgotPassword(info))
        .unwrap()
        .then((data) => {
          setSuccessMessage(data.message);
        })
        .catch((err) => {
          setErrMessage(err);
          console.error("Failed to login:", err);
        });
      setInfo({
        email: "",
      });
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <div className="card max-w-sm mx-auto mt-4">
      <h3 className="text-2xl font-semibold mb-3">Forgot Password!</h3>
      <p className="text-sm">
        Enter the email address associsated with your account and we'll send you
        a link to reset your password.
      </p>
      {errMessage && <div className="errorMessageAlert">{errMessage}</div>}
      {successMessage && (
        <div className="successMessageAlert">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3 my-3">
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
        <button type="submit" className="btn w-full">
          Submit
        </button>
      </form>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/user/register" className="underline">
          Register here!
        </Link>
      </div>
    </div>
  );
};
export default ForgotPassword;
