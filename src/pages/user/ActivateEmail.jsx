import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAPI } from "../../utils";

const ActivateEmail = () => {
  const { token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (token) {
      const activateEmail = async () => {
        try {
          const API = getAPI();
          await API.post("/user/activateEmail", {
            activation_token: token,
          });
          setError(false);
        } catch (error) {
          setError(true);
          console.log(error);
        }
      };
      activateEmail();
    }
  }, [token]);
  if (error) {
    return (
      <div className="errorMessageAlert">
        Access token expires or user is already exist, Please register again!,{" "}
        <Link to="/user/register" style={{ color: "white" }}>
          Register here
        </Link>
      </div>
    );
  }
  return (
    <div className="successMessageAlert">
      Account has been activated.{" "}
      <Link to="/user/login" style={{ color: "white" }}>
        Login here
      </Link>
    </div>
  );
};
export default ActivateEmail;
