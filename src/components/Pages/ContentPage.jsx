import React, { useEffect, useState ,useRef} from "react";
import "primeicons/primeicons.css";
import { useParams } from "react-router-dom";
import "./contentpage.scss";
import axios from "axios";
import moment from "moment";

const ContentPage = () => {
  const url = process.env.REACT_APP_HOST_URL;
  const key = process.env.REACT_APP_API;
  const contentRef = useRef(null);
  const botimg= "https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?semt=ais_hybrid&w=740"

  const { _id } = useParams();
  const [rcData, setRcData] = useState([]);
  // const [viewsa, setViews] = useState();
  const formatDate = (date) => {
    return moment(date).format("DD MMMM   YYYY")
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

  return (
    <div>
      {rcData.map((item) => (
        <div className="pagecontnent" key={item._id}>
          <div className="page-deatails">
            <div className="all-contnet">
              <div className="page-aurthor">
                <div className="auth-img">
                  <img src={botimg} alt="" />
                </div>
                <div className="auth-detal">
                  <p className="authname">
                    {item.aurthor?.includes("@gmail.com")
                      ? item.aurthor.split("@")[0]
                      : item.aurthor}
                  </p>
                  <div className="tirdsec">
                    <p className="autdat">{formatDate(item.createdAt)}</p>
                    <p className="autdat ">View  {item.views}</p>
                  </div>
                </div>
              </div>
              <div className="menu-button pi pi-ellipsis-v"></div>
            </div>
            <div className="page-contnet-detail">
              <div className="pagefirstcont">
                {/* <img src={item.File} alt="" /> */}
                <h1>{item.title}</h1>
                {/* <br /> */}

                <div
                  className="prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentPage;
