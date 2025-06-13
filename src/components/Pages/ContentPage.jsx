import React, { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import { useParams } from "react-router-dom";
import "./contentpage.scss";
import axios from "axios";
import moment from "moment";

const ContentPage = () => {
  const url = process.env.REACT_APP_HOST_URL;
  const key = process.env.REACT_APP_API;

  const { _id } = useParams();
  const [rcData, setRcData] = useState([]);
  // const [viewsa, setViews] = useState();
  const formatDate = (date) => {
    return moment(date).format("DD-MMMM-YYYY").toUpperCase();
  };

  useEffect(() => {
    const sendingmethod = async () => {
      const idSend = await axios.post(url + "/sendId" + _id, {
        headers: { "access-key": key },
      });
      if (idSend.status === 200) {
        setRcData(idSend.data.sendid);
        // console.log(idSend);
      }
    };
    const countView = async () => {
      const send = await axios.get(url + "/postview" + _id, {
        headers: { "access-key": key },
      });
      if (send.status === 200) {
        // alert("hii")
        // setViews(send.data.views);
        // console.log(viewsa);
      }
    };

    sendingmethod();
    countView();
  }, [_id]);

  // const countView = async () => {
  //   const views = await axios.get(url + '/UserpostViews', _id,{
  //     headers: { "access-key": key },
  //   })
  //   if(views.status === 200){
  //     alert("views count")
  //     setViews(views.data)
  //   }
  // };

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
                  {/* <p className="autdat">{viewsa.views}</p> */}
                </div>
              </div>
              <div className="menu-button pi pi-ellipsis-v"></div>
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
