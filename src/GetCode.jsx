import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./styles/GetCode.css";

const darkCustom = {
  ...dark,
  'pre[class*="language-"]': {
    ...dark['pre[class*="language-"]'],
    backgroundColor: "#111",
    border: "solid 1px #6a0dad",
    borderRadius: "10px", // Set background color to black
  },
};

const GetCode = ({ code, language }) => {
  const [content, setContent] = useState(code);
  const [formatlang, setFormatLang] = useState(language);

  useEffect(() => {
    language === "python" ? setFormatLang("python") : setFormatLang("html");
    setContent(code);
  }, [code]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="code-box">
        <SyntaxHighlighter language={formatlang} style={darkCustom}>
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default GetCode;
