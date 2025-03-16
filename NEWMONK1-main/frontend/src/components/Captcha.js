import React, { useState } from "react";

const generateCaptcha = () => {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const Captcha = ({ setCaptchaValid }) => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [input, setInput] = useState("");

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setInput("");
    setCaptchaValid(false);
  };

  const validateCaptcha = (e) => {
    setInput(e.target.value);
    setCaptchaValid(e.target.value === captcha);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
      <div
        style={{
          padding: "10px 20px",
          backgroundColor: "#f3f3f3",
          fontSize: "24px",
          fontWeight: "bold",
          letterSpacing: "2px",
          textAlign: "center",
          width: "150px",
          marginBottom: "10px",
          borderRadius: "5px",
        }}
      >
        {captcha}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <button 
          type="button" 
          onClick={refreshCaptcha} 
          style={{
            padding: "5px 10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🔄 Refresh
        </button>
        <input
          type="text"
          placeholder="Enter Captcha"
          value={input}
          onChange={validateCaptcha}
          required
          style={{
            padding: "5px 10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "60%",
            textAlign: "center",
          }}
        />
      </div>
    </div>
  );
};

export default Captcha;
