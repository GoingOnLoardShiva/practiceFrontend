import React from "react";
import "./foote.scss";


const Footer = () => {
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
              <input className="desk" type="email" placeholder="Enter Email"/>
              <button className="deska">Suscribe</button>
            </div>
          </div>
          <p>© 2023 DakFront. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer;
