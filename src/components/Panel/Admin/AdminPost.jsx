import React, { useState, useRef, useEffect } from "react";
import "./Adminpost.scss";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { AutoComplete } from "primereact/autocomplete";
import { useFormik, FormikProvider, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { redirect } from "react-router-dom";
import { account } from "../../../appwrite";
import Cookie from "js-cookie";
// import { FileUpload } from 'primereact/fileupload';

// import { Input} from "primereact/input";

const AdminPost = () => {
  const url = process.env.REACT_APP_HOST_URL;
  const apikey = process.env.REACT_APP_API;
  const [gituser, setgitUser] = useState(account);
  const [rdimg, setimage] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const nevigate = useNavigate();
  const myString = JSON.stringify(gituser)

  // const gitemail = myString


  useEffect(() => {
    const findAdmin = async () => {
      const accountData = await account
        .get()
        .then(setgitUser)
        .catch(console.error);
        Cookie.set(account)
      const adminf = await axios.post(
        url + "/admifinder",
        {
          gituser,
        },
        {
          headers: {
            "x-api-key": apikey,
          },
        }
      );
      if (adminf.status === 200) {
        
        const sessionId = localStorage.getItem("account");
        alert(sessionId);
        
        // nevigate("/");
      }
    };
    findAdmin();
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(rdimg.File);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset message after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // let short = this.props.details.substring(100, 0);
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = rdimg.File;
    link.download = rdimg.File;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fileUploadRef = useRef(null);
  const triggerFileUpload = () => {};

  const handleUpload = async ({ files }) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("image", file);
    // formData.append("email_id", userEmail);

    const res = await axios.post(url + "/uploadProfileImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "access-key": apikey,
      },
    });
    if (res.status === 200) {
      setimage(res.data.user);
      console.log(res);
      console.log(rdimg);
    }
  };

  const validationSchema = Yup.object({
    Title: Yup.mixed("Invalid Transaction Hash!!! Please Check").required(
      "Invalid Value!!! Please Check."
    ),
    description: Yup.mixed("Invalid Data").required(
      "Invalid Value!!! Please Check."
    ),
    Aurthor: Yup.mixed("Invalid Data Found").required("Invalid Data Found"),
    imglink: Yup.mixed("Invalid Data Found").required("Invalid Data Found"),
  });
  const formik = useFormik({
    initialValues: {
      Title: "",
      description: "",
      Aurthor: "",
      File: "",
      imglink: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const resp = await axios.post(
        url + "/Adminpost",
        {
          values,
        },
        {
          headers: {
            "x-api-key": apikey,
          },
        }
      );
      if (resp.status === 200) {
        nevigate(0);
      }
    },
  });
  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div>
      <div className="form">
        <div className="fromcompo">
          <div className="fform">
            <div className="card">
              <FileUpload
                ref={fileUploadRef}
                name="avatar"
                accept="image/*"
                maxFileSize={1000000}
                customUpload
                className="fileup"
                uploadHandler={handleUpload}
                // mode="basic"
                auto
                style={{ display: "flex" }}
              />
              {/* <img value={rdimg.File} alt="" />
               */}
              <img src={rdimg.File} alt="" />
              <p
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "200px", // Set a fixed width
                }}
              >
                {rdimg.File}
              </p>
              {/* <Button  onClick={handleDownload}>
                Download
              </Button> */}
              <Button
                className="copy pi pi-check"
                onClick={copyToClipboard}
                disabled={isCopied}
              >
                {isCopied ? "Link Copied!" : "Copy Link" || ""}
              </Button>
              <div className="gituser">
                {gituser ? (
                  <div className="git-detail">
                    <h1>Welcome, {gituser.name || gituser.email}!</h1>,
                    <img src={gituser.img} alt="" />
                  </div>
                ) : (
                  <p>Loading user info...</p>
                )}
              </div>
            </div>
          </div>
          <div className="secform">
            <FormikProvider value={formik}>
              <Form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="form-group flex flex-column gap-3">
                  <div className="component flex flex-column">
                    {/* {getFormErrorMessage("File")} */}
                  </div>
                  <div className="component flex flex-column">
                    <div>Ttile</div>
                    <InputText
                      type="text"
                      name="Title"
                      placeholder="Enter Ttile"
                      autoFocus
                      onChange={formik.handleChange}
                      value={formik.values.Title}
                    />
                    {getFormErrorMessage("Title")}
                  </div>
                  {/* <div className="component flex flex-column">
                    <div>Mobile No</div>
                    <InputText
                      type="text"
                      name="mobile"
                      placeholder="User Mobile No"
                      onChange={formik.handleChange}
                      value={formik.values.mobile}
                    />
                    {getFormErrorMessage("mobile")}
                  </div>
                  <div className="component flex flex-column">
                    <div>Portal Id</div>
                    <InputText
                      type="text"
                      name="portalid"
                      placeholder="User Mobile No"
                      onChange={formik.handleChange}
                      value={formik.values.portalid}
                    />
                    {getFormErrorMessage("portalid")}
                  </div> */}
                  <div className="component flex flex-column">
                    <div>Description</div>
                    <InputTextarea
                      // value={value}
                      className="desk"
                      // placeholder="User Mobile No"
                      name="description"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      rows={5}
                      placeholder="Enter Description"
                      cols={AutoComplete}
                    />
                    {getFormErrorMessage("description")}
                  </div>
                  <div className="component flex flex-column">
                    <div>Image Link</div>
                    <InputText
                      // value={value}
                      className="desk"
                      // placeholder="User Mobile No"
                      name="imglink"
                      onChange={formik.handleChange}
                      value={formik.values.imglink}
                      rows={5}
                      placeholder="Enter Description"
                      cols={AutoComplete}
                    />
                    {getFormErrorMessage("imglink")}
                  </div>
                  <div className="component flex flex-column">
                    <div>Aurthor Name</div>
                    <InputText
                      // value={value}
                      className="Aurthor"
                      name="Aurthor"
                      // placeholder="User Mobile No"
                      onChange={formik.handleChange}
                      value={formik.values.Aurthor}
                      placeholder="Enter Aurthor name"
                    />
                    {getFormErrorMessage("Aurthor")}
                  </div>
                  <br />
                  {/* <br /> */}
                  <Button label="Submit" />
                </div>
              </Form>
            </FormikProvider>
          </div>
        </div>

        {/* <input type="text" /> */}
      </div>
    </div>
  );
};

export default AdminPost;
