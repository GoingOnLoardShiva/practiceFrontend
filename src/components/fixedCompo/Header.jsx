import React, { useEffect, useState } from "react";
import "./header.scss";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import { Link } from "react-router-dom";

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = "b87f80414b884bc795470321252305";
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeatherByCoords(lat, lon);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  // Fetch weather by coordinates
  const fetchWeatherByCoords = (lat, lon) => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleDate();
    hadleTime();
  }, []);
  const handleDate = () => {
    const newdate = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = newdate.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);
  };
  const hadleTime = () => {
    const timeautochange = setInterval(() => {
      const newdate = new Date();
      const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
      const formattedTime = newdate.toLocaleTimeString("en-US", options);
      setCurrentTime(formattedTime);
    }, 1000);
    return () => {
      clearInterval(timeautochange);
    };
  };
  return (
    <div>
      <div className="headercompo">
        <div className="headercompo__logo">
          <img src={window.location.origin + "/dakkkh2nd.png"} alt="Logo" />
          <div className="timinga">
            <p>{currentDate}</p>
            <p>{currentTime}</p>
          </div>
          <div className="wethdetaila">
            {loading && <p>Loading weather data...</p>}

            {weather && weather.current && (
              <div className="weathercontent">
                <img src={weather.current.condition.icon} alt="Weather icon" />
                <div className="dewe">
                  <p>
                    {weather.location.name}, {weather.location.country}
                  </p>
                  <p>{weather.current.temp_c}°C</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="headercompo__nav">
          <a href="/">Home</a>
          <a href="About">About</a>
          {/* <a href="">Services</a> */}
          <a href="Services">Contact</a>
          {/* <a href="Services">Contact</a> */}

          {/* <Link to={"AdminLogin"}>hiii</Link> */}
          {/* <Link to="/admin/Postpage">Go to Post Page</Link> */}
        </div>
        <div className="timing">
          <p>{currentDate}</p>
          <p>{currentTime}</p>
        </div>
        <div className="wethdetail">
          {loading && <p>Loading weather data...</p>}

          {weather && weather.current && (
            <div className="weathercontent">
              <img src={weather.current.condition.icon} alt="Weather icon" />
              <div className="dewe">
                <p>
                  {weather.location.name}, {weather.location.country}
                </p>
                <p>{weather.current.temp_c}°C</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
