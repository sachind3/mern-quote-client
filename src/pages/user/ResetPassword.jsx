import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actionResetPassword } from "../../redux/features/userSlice";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    password: "",
  });

  const [errors, setErrors] = useState({
    password: "",
  });

  const validate = () => {
    let passwordError = "";

    if (!info.password) {
      passwordError = "Password is required";
    } else if (info.password.length < 6) {
      passwordError = "Password must be at least 6 characters";
    }
    if (passwordError) {
      setErrors({ password: passwordError });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      setErrors({ password: "" });
      dispatch(actionResetPassword({ token, password: info.password }))
        .unwrap()
        .then((data) => {
          toast.success(data.message);

          navigate("/user/login");
        })
        .catch((err) => {
          toast.error("Failed to reset password, your token is expired");
          console.error("Failed to reset password:", err);
        });
    }
  };

  return (
    <div className="card max-w-sm mx-auto mt-4">
      <h3 className="text-2xl font-semibold mb-3">Reset password</h3>
      <form onSubmit={handleSubmit} className="space-y-3 my-3">
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
          Submit
        </button>
      </form>
    </div>
  );
};
export default ResetPassword;
