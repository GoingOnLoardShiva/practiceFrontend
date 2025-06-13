import React, { useEffect, useState } from "react";
import "./landing.scss";
import axios from "axios";
import moment from "moment";
import { numify } from "numify";

const Landing = () => {
  const url = process.env.REACT_APP_HOST_URL;
  const key = process.env.REACT_APP_API;
  const [number, setNumber] = useState(null);
  const [rcData, setRcdata] = useState([]);
  const formatDate = (date) => {
    return moment(date).format("DD MMMM").toUpperCase();
  };

  useEffect(() => {
    recivedata();
  }, []);
  function formatViews(num) {
    if (num >= 1000000)
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return num.toString();
  }

  const recivedata = async () => {
    const response = await axios.get(url + "/blogrecive", {
      headers: { "access-key": key },
    });
    if (response.status === 200) {
      // const result = Object.values(response.data)
      setRcdata(response.data);
      // setNumber(numify(response.data.views));
    }
  };

  return (
    <div className="landingpage">
      <div className="ladingcontent">
        {rcData.map((item) => (
          <div className="landdiv">
            <img src={item.File} alt="" />
            <p className="landingtext">{item.Title}</p>
            <div className="middlecontnet">
              <p className="author">{item.Aurthor}</p>
              <p className="author">{formatDate(item.postdate)}</p>
              <p className="author pi pi-eye">{formatViews(item.views)}</p>
            </div>

            <p
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                // width: "200px",
              }}
            >
              {item.description}
            </p>
            {/* <p>{formattedDate}</p> */}
            <a href={`/page/${encodeURIComponent(item._id)}`}>Read</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
