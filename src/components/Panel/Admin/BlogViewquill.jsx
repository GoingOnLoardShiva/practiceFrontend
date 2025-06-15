import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Skeleton } from "@mui/material";
import "./landinga.scss";

const PostView = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = process.env.REACT_APP_HOST_URL;
  const key = process.env.REACT_APP_API;

  const formatDate = (date) => {
    return moment(date).format("DD MMMM");
  };

  useEffect(() => {
    axios
      .get(`${url}/blogpostview`, {
        headers: { "access-key": key },
      })
      .then((res) => {
        const data = res.data;

        // Log response for debugging (can remove later)
        console.log("API response:", data);

        // If the API returns an array
        if (Array.isArray(data)) {
          setPosts(data);
        }
        // If the API returns an object with array in a key
        else if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.error("Invalid data format from API:", data);
          setPosts([]); // fallback
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
        setPosts([]); // fallback
      });
  }, [url, key]);

  return (
    <div className="landingpage">
      <div className="ladingcontent">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div className="landdiv" key={index}>
              <Skeleton
                variant="rectangular"
                width={250}
                height={150}
                style={{
                  borderRadius: "8px",
                  marginBottom: "10px",
                  margin: "0px",
                }}
              />
              <Skeleton variant="text" width="80%" height={30} />
              <div className="middlecontnet">
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="30%" />
                <Skeleton variant="text" width="20%" />
              </div>
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="60%" />
            </div>
          ))
        ) : Array.isArray(posts) && posts.length > 0 ? (
          posts.map((item) => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = item.content;

            const firstImg = tempDiv.querySelector("img")?.src;
            const plainText = tempDiv.textContent || "";
            const shortText =
              plainText.length > 150
                ? plainText.slice(0, 150) + "..."
                : plainText;

            return (
              <div className="div" key={item._id}>
                <a id="maindiv" href={`/page/${encodeURIComponent(item._id)}`}>
                  <div className="landdiv">
                    {firstImg && (
                      <img
                        src={firstImg}
                        alt="Blog preview"
                        style={{
                          width: "250px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginBottom: "10px",
                          margin: "0px",
                        }}
                      />
                    )}
                    <p className="landingtext">{item.title}</p>
                    <div className="middlecontnet">
                      <p className="author">
                        {item.aurthor?.includes("@gmail.com")
                          ? item.aurthor.split("@")[0]
                          : item.aurthor}
                      </p>
                      <p className="author">{formatDate(item.createdAt)}</p>
                      <p className="author pi pi-eye">&nbsp;{item.views}</p>
                    </div>
                    <p
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {shortText}
                    </p>
                    <a href={`/page/${encodeURIComponent(item._id)}`}>Read</a>
                  </div>
                </a>
              </div>
            );
          })
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default PostView;
