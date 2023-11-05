import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protectd = ({ Component }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("login");

  useEffect(() => {
    if (!token) {
      console.log(!token, "token");
      navigate("/");
      return;
    }
  }, [Component, token]);

  return (
    <div>
      <Component />
    </div>
  );
};

export default Protectd;
