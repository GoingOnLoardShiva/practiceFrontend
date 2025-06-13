import React, { useState } from "react";
import "./foote.scss";
import axios from "axios";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState();
  const url = process.env.REACT_APP_HOST_URL;
  const key = process.env.REACT_APP_API;
  const nevigate = useNavigate();
  const subscribe = async () => {
    const response = await axios.post(
      url + "/subscribe",
      {
        email,
      },
      {
        headers: { "access-key": key },
      }
    );
    if (response.status === 200) {
      // const result = Object.values(response.data)
      // setEmail(response.data);
      // setNumber(numify(response.data.views));
      alert("Thanks for Subscribe");
      redirect('/')
      nevigate("/");
    }
  };
  return (
    <div>
      <div className="footerstyle">
        <div className="footerstyle__logo">
          <div className="flogo">
            <img src={window.location.origin + "/dakkkh2nd.png"} alt="Logo" />
            <div className="addetails">
              <div>Address: 123 Main St, City, Country</div>
              <div>Email: daakhoffcial@email.com</div>
              <div>Contact: +91 7834334489</div>
            </div>
          </div>
          <div className="footercontent">
            <div className="footerfcontent">
              <a href="">Home</a>
              <a href="">About</a>
              <a href="">Services</a>
              <a href="">Contact</a>
            </div>
            <div className="footerscontent">
              <a href="">Privacy Policy</a>
              <a href="">Terms of Service</a>
              <a href="">FAQ</a>
            </div>
            <div className="suscribe">
              <input
                className="desk"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="  Enter Email"
              />
              <button className="deska" onClick={subscribe} type="submit">
                Suscribe
              </button>
            </div>
          </div>
          <p>© 2023 DakFront. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
