import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isValidUser, setIsValidUser] = useState(false);
  const email = Cookies.get("userEmail"); // get cookie
  const url = process.env.REACT_APP_HOST_URL;
  const key = process.env.REACT_APP_API;
  useEffect(() => {
    const verifyEmail = async () => {
      if (!email) {
        setLoading(false);
        setIsValidUser(false);
        return;
      }

      try {
        const response = await axios.post(url + "/verifyuser", {
          email,
        }, {
          headers: { "access-key": key }
        });
        // if(res.status === 200){

        // }

        setIsValidUser(response.data.exists === true); 
      } catch (err) {
        console.error("Verification failed:", err);
        setIsValidUser(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [email]);

  if (loading) return <div>Checking...</div>;

  return isValidUser ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
