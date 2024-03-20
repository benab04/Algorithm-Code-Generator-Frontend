import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Toast, Button } from "react-bootstrap";
import "./styles/GetCode.css";

const darkCustom = {
  ...dark,
  'pre[class*="language-"]': {
    ...dark['pre[class*="language-"]'],
    backgroundColor: "#111",
    border: "solid 1px #6a0dad",
    borderRadius: "10px",
  },
};

const GetCode = ({ code, language, remainingCredits }) => {
  const [content, setContent] = useState(code);
  const [formatlang, setFormatLang] = useState(language);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setShowToast(true);
  };

  const toggleToast = () => setShowToast(!showToast);

  useEffect(() => {
    language === "python" ? setFormatLang("python") : setFormatLang("html");
    setContent(code);
  }, [code]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="code-box">
        {remainingCredits !== null && (
          <div className="button-div">
            <div className="submit-btn" onClick={handleCopy}>
              Copy
            </div>
            {remainingCredits !== undefined && (
              <button className="credit-btn disabled">
                Remaining Credits: {remainingCredits}
              </button>
            )}
          </div>
        )}
        <SyntaxHighlighter language={formatlang} style={darkCustom}>
          {content}
        </SyntaxHighlighter>
      </div>
      <Toast
        show={showToast}
        onClose={toggleToast}
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          backgroundColor: "#dac4ff",
        }}
      >
        <Toast.Header className="d-flex justify-content-between">
          <strong className="mr-auto">Message</strong>
        </Toast.Header>
        <Toast.Body style={{ textAlign: "left" }}>
          Code copied to clipboard!
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default GetCode;
