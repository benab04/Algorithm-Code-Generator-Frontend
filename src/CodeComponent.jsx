import React, { useState, useEffect } from "react";
import GetCode from "./GetCode";
import "./styles/CodeComponent.css";
import Loader from "./Loader";
function CodeComponent() {
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const [userInput, setUserInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] =
    useState(`  num1 = int(input("Enter the first number: "))
  num2 = int(input("Enter the second number: "))

  def calculate_sum(num1, num2):
      return num1 + num2
  
  sum = calculate_sum(num1, num2)
  print("The sum is:", sum)`);
  const [remainingCredits, setRemainingCredits] = useState(null);
  const [received, setReceived] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(base_url)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            console.log(data);
            setReceived(true);
            clearInterval(interval);
          }
        })
        .catch((err) => console.log(err));
    }, 3000);
  }, []);

  const handleSubmit = () => {
    const formData = new FormData();
    setReceived(false);
    formData.append("text", userInput);
    formData.append("language", selectedLanguage);

    fetch(base_url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const receivedCode = data.code;
        setCode(receivedCode);
        setReceived(true);
        setRemainingCredits(data.remaining_credits);
      })
      .catch((error) => {
        console.error("Error fetching code:", error);
      });
  };

  return (
    <div class="contain">
      <div class="form-wrapper">
        <textarea
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder=" 1. Input two numbers from the user 
            2. Define a function to calculate and return the sum 
            3. Print the sum"
          required
        />
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="go">Go</option>
          <option value="php">PHP</option>
        </select>

        <button className="submit-btn" onClick={() => handleSubmit()}>
          Submit
        </button>
        {!received && <Loader />}
        {code !== null && received && (
          <GetCode
            language={selectedLanguage}
            code={code}
            remainingCredits={remainingCredits}
          />
        )}
      </div>
    </div>
  );
}

export default CodeComponent;
