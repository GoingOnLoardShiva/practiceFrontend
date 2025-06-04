import React from "react";
import "./Adlog.scss";
import { account } from "../../../appwrite";
const AdminLogin = () => {
  const handleGitHubLogin = () => {
    account.createOAuth2Session(
      "github",
      "http://localhost:3000/Adminpost", 
      "https://localhost:3000/" 
    );
  };
  return (
    <div>
      <div className="admin-login">
        <button onClick={handleGitHubLogin}>Sign in with GitHub</button>
      </div>
    </div>
  );
};

export default AdminLogin;
