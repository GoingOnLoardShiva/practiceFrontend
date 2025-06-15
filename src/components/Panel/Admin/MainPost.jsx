import React, { useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./mainpost.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "background",
  "align",
  "script",
  "code-block",
];

const PostEditor = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [aurthor, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const email = Cookies.get("userEmail");

  const url = process.env.REACT_APP_HOST_URL;
  const key = process.env.REACT_APP_API;

  const handleLogout = () => {
    Cookies.remove("userEmail");
    <navigate to="/" />
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const email = Cookies.get("userEmail");

    if (!email) {
      alert("User not logged in.");
      return;
    }

    const payload = {
      email, // ✅ send email directly from cookie
      title,
      content,
    };

    setLoading(true);
    try {
      const response = await axios.post(url + "/blogpost", payload, {
        headers: { "access-key": key },
      });
      alert("Post published successfully");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
      alert("Failed to publish post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="qullcon"
      className="flex justify-center items-center min-h-screen bg-gray-50"
    >
      <div id="qullconttent" className="w-full max-w-4xl mt-10 p-5 shadow-lg border rounded-xl bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Create New Post</h1>
        <input
          // id="titlein"
          className="w-full text-xl p-2 border-b mb-4 outline-none"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="..."
          value={Cookies.get("userEmail")}
          hidden
          onChange={(e) => setAuthor(e.target.value)}
        />

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          className="mb-4 h-72"
        />
        <div className="flex justify-center">
          <button
            onClick={handlePost}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Publishing...
              </div>
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default PostEditor;
