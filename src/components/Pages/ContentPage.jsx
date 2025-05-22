import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import "./contentpage.scss";
import axios from "axios";
import moment from "moment";

const ContentPage = () => {
  const url = process.env.REACT_APP_HOST_URL;
  const key = process.env.REACT_APP_API;
  const { _id } = useParams();
  const [rcData, setRcData] = useState([]);
  const formatDate = (date) => {
    return moment(date).format("DD-MMMM-YYYY").toUpperCase();
  };

  useEffect(() => {
    sendingmethod();
  }, []);

  const sendingmethod = async () => {
    const idSend = await axios.post(url + "/sendId" + _id, {
      headers: { "access-key": key },
    });
    if (idSend.status === 200) {
      setRcData(idSend.data.sendid);
      console.log(idSend);
    }
  };
  return (
    <div>
      {rcData.map((item) => (
        <div className="pagecontnent" key={item._id}>
          <div className="page-deatails">
            <div className="all-contnet">
              <div className="page-aurthor">
                <div className="auth-img">
                  <img src={item.File} alt="" />
                </div>
                <div className="auth-detal">
                  <p className="authname">{item.Aurthor}</p>
                  <p className="autdat">{formatDate(item.postdate)}</p>
                </div>
              </div>
              <div className="menu-button">
                <li></li>
                <li></li>
                <li></li>
              </div>
            </div>
            <div className="page-contnet-detail">
              <div className="pagefirstcont">
                <img src={item.File} alt="" />
                <h1>{item.Title}</h1>
                {/* <br /> */}
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentPage;
