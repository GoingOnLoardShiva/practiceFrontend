import React, { useEffect, useState } from "react";
import "./landing.scss";
import axios from "axios";
import moment from "moment";

const Landing = () => {
  const url = process.env.REACT_APP_HOST_URL;
  const key = process.env.REACT_APP_API;
  const [rcData, setRcdata] = useState([]);
  const formatDate = (date) => {
    return moment(date).format("DD-MMMM-YYYY").toUpperCase();
  };

  useEffect(() => {
    recivedata();
  }, []);
  
  const recivedata = async () => {
    const response = await axios.get(url + "/blogrecive", {
      headers: { "access-key": key },
    });
    if (response.status === 200) {
      // const result = Object.values(response.data)
      setRcdata(response.data);
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
              <p className="author pi pi-eye"></p>
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
