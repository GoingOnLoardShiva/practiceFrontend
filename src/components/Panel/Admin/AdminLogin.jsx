import React, { useState } from "react";
import axios from "axios";
import "./main.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const url = process.env.REACT_APP_HOST_URL;
  const key = process.env.REACT_APP_API;
  const navigate = useNavigate();

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        url + "/sendotp",
        { email },
        { headers: { "access-key": key } }
      );
      setMessage(res.data.message);
      setStep("otp");
    } catch (err) {
      setMessage("Failed to send OTP");
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        url + "/verifyOtp",
        { email, otp },
        { headers: { "access-key": key } }
      );
      if (res.data.success) {
        setMessage("Login successful!");
        Cookies.set("userEmail", email, { expires: 7 });
        navigate("/admin/Postpage");
      } else {
        setMessage("Invalid OTP");
      }
    } catch (err) {
      setMessage("Verification failed");
    }
    setLoading(false);
  };

  return (
    <div id="qullcon" className="flex justify-center items-center">
      <div className="glassy-card">
        <h2>OTP Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="glassy-input"
          value={email}
          disabled={step === "otp"}
          onChange={(e) => setEmail(e.target.value)}
        />
        {step === "otp" && (
          <input
            type="text"
            placeholder="Enter OTP"
            className="glassy-input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}
        <button
          onClick={step === "email" ? sendOtp : verifyOtp}
          disabled={loading}
          className="glassy-btn"
        >
          {loading
            ? "Processing..."
            : step === "email"
            ? "Send OTP"
            : "Verify OTP"}
        </button>
        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
