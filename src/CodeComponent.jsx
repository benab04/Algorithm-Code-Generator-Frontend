import React, { useState } from "react";
import GetCode from "./GetCode";
import "./styles/CodeComponent.css";
function CodeComponent() {
  const [userInput, setUserInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(`# Input two numbers from the user
  num1 = int(input("Enter the first number: "))
  num2 = int(input("Enter the second number: "))
  
# Define a function to calculate and return the sum
  def calculate_sum(num1, num2):
      return num1 + num2
  
# Print the sum
  sum = calculate_sum(num1, num2)
  print("The sum is:", sum)`);
  const [remainingCredits, setRemainingCredits] = useState(null);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("text", userInput);
    formData.append("language", selectedLanguage);

    fetch("http://localhost:8000/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const receivedCode = data.code;
        setCode(receivedCode);
        setRemainingCredits(data.remaining_credits);
      })
      .catch((error) => {
        console.error("Error fetching code:", error);
      });
  };

  console.log("Code:", code);
  console.log("Remaining Credits:", remainingCredits);

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
        <div className="button-div">
          <button className="submit-btn" onClick={() => handleSubmit()}>
            Submit
          </button>
          {remainingCredits != null && (
            <button className="credit-btn disabled">
              Remaining Credits :{remainingCredits}
            </button>
          )}
        </div>
        {code !== null && <GetCode language={selectedLanguage} code={code} />}
      </div>
    </div>
  );
}

export default CodeComponent;
