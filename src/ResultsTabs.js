import React, { useState } from "react";

function ResultsTabs({ activeTab, onTabChange, analysisData }) {

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter words based on the search query
  const filteredWords = Object.keys(analysisData.wordFrequency).filter((word) =>
    word.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Define button styles as constants with inline styles
  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    margin: "0 10px",
    outline: "none", // Remove focus outline
  };

  const activeButtonStyle = {
    ...buttonStyle, // Include the base button styles
    backgroundColor: "#0056b3",
    color: "#fff",
  };

  const inactiveButtonStyle = {
    ...buttonStyle, // Include the base button styles
    backgroundColor: "#007bff",
    color: "#fff",
  };

  const searchInputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    maxWidth: "300px", // Adjust the width as needed
    fontSize: "16px",
    outline: "none", // Remove focus outline
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
  };


  const cardStyles = {
    container: {
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '10px',
      width: '200px',
      textAlign: 'center',
      margin: '10px', // Add margin to create spacing between cards
    },
    title: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    value: {
      fontSize: '1rem',
      color: '#007bff', // You can adjust the text color here
    },
  };

  const renderTabContent = () => {
    if (activeTab === "topWords") {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '20px' }}>
          {Object.keys(analysisData.topWords).map((word, index) => (
            <div key={index} style={cardStyles.container}>
              <div style={cardStyles.title}>{word}</div>
              <div style={cardStyles.value}>{analysisData.topWords[word]}</div>
            </div>
          ))}
        </div>

      );
    } else if (activeTab === "topCoOccurredWords") {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '20px' }}>
          {Object.keys(analysisData.topCoOccurredWords).map((word, index) => (
            <div key={index} style={cardStyles.container}>
              <div style={cardStyles.title}>{word}</div>
              <div style={cardStyles.value}>{analysisData.topCoOccurredWords[word]}</div>
            </div>
          ))}
        </div>
      );
    } else if (activeTab === "allWords") {
      return (
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            placeholder="Search words"
            onChange={(e) => handleSearch(e.target.value)}
            style={searchInputStyle}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {filteredWords.map((word, index) => (
              <div key={index} style={cardStyles.container}>
                <div style={cardStyles.title}>{word}</div>
                <div style={cardStyles.value}>{analysisData.wordFrequency[word]}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="tabs">
        <button
          onClick={() => onTabChange("topWords")}
          style={activeTab === "topWords" ? activeButtonStyle : inactiveButtonStyle}
        >
          Top Words
        </button>
        <button
          onClick={() => onTabChange("topCoOccurredWords")}
          style={activeTab === "topCoOccurredWords" ? activeButtonStyle : inactiveButtonStyle}
        >
          Co-Occurred Words
        </button>
        <button
          onClick={() => onTabChange("allWords")}
          style={activeTab === "allWords" ? activeButtonStyle : inactiveButtonStyle}
        >
          All Words
        </button>
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default ResultsTabs;
