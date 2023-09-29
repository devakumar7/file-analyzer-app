import React, { useState } from "react";
import ResultsTabs from "./ResultsTabs";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState("topWords"); // Default to topWords tab
  const [analysisData, setAnalysisData] = useState(null);

  // Step 2: Update the state variable conditionally when analysisData changes
  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    margin: "0 10px",
    outline: "none", // Remove focus outline
  };

  const activeButtonStyle = {
    backgroundColor: "#0056b3",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    margin: "0 10px",
    outline: "none", // Remove focus outline
  };

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "#fff",
    // Add more custom styles as needed
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:3333/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const topWordsObject = data.topWords;
          const topCoOccurredWordsObject = data.topCoOccurredWords;
          const wordFrequencyObject = data.wordFrequency;
          console.log(topWordsObject);
          console.log(topCoOccurredWordsObject);
          console.log(wordFrequencyObject);

          setAnalysisData(data); // Update the analysisData state with the API response
          // Process and display data (e.g., top words, co-occurred words, frequency) here
        } else {
          // Handle API error
        }
      } catch (error) {
        // Handle network or other errors
      }
    }
  };

  return (
    <div>
      <h2>Upload a File for Analysis</h2>
      <input type="file" onChange={handleFileChange} />


      <button style={{
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
      }}
        onClick={handleSubmit}
      >
        Submit
      </button>

      {analysisData && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", borderRadius: "5px", padding: "20px", backgroundColor: "#fff" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Analysis Results</h3>
          <ResultsTabs activeTab={activeTab} onTabChange={handleTabChange} analysisData={analysisData} />
        </div>
      )}
    </div>



  );
}
export default FileUpload;

