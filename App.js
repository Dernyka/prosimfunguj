import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [joke, setJoke] = useState("");
  const [history, setHistory] = useState([]);


  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);


  const fetchJoke = async () => {
    try {
      const response = await axios.get("https://api.chucknorris.io/jokes/random");
      setJoke(response.data.value);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };


  const addToHistory = () => {
    setHistory([...history, { text: joke, rating: null }]);
    setJoke("");
  };


  const rateJoke = (index, rating) => {
    const updatedHistory = [...history];
    updatedHistory[index].rating = rating;
    setHistory(updatedHistory);
  };


  const deleteJoke = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Chuck Norris Jokes</h1>
      <div className="text-center">
        <button className="btn btn-primary mb-3" onClick={fetchJoke}>
          Get a Joke
        </button>
      </div>
      {joke && (
        <div className="text-center mb-3">
          <p>{joke}</p>
          <button className="btn btn-success" onClick={addToHistory}>
            Save to History
          </button>
        </div>
      )}
      <h2>History</h2>
      <ul className="list-group">
        {history.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{item.text}</span>
            <div>
              <button
                className={`btn btn-sm ${
                  item.rating === "like" ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => rateJoke(index, "like")}
              >
                👍
              </button>
              <button
                className={`btn btn-sm ms-2 ${
                  item.rating === "dislike" ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={() => rateJoke(index, "dislike")}
              >
                👎
              </button>
              <button
                className="btn btn-sm btn-outline-secondary ms-2"
                onClick={() => deleteJoke(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
