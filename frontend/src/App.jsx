import './App.css';

import { useState, useEffect } from "react";

function App() {
  const [symbol, setSymbol] = useState("");
  const [result, setResult] = useState(null);
  const [data, setData] = useState(null);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchStock = async () => {
    if(result.toLowerCase() === "hi backend!"){
      //const res = await fetch(`http://localhost:8080/api/hello`);
      const res = await fetch(`${API_URL}/api/hello`);
      const text = await res.text();
      setData(text);
    } 
    else {
      //const res = await fetch(`http://localhost:8080/api/quote?symbol=${result}`);
      const res = await fetch(`${API_URL}/api/quote?symbol=${result}`);
      const json = await res.json();

      if(json.d !== null){
        setData(json);
        setSymbol(result);
      }
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h1>Stock Price Checker</h1>
      <div class="searchbar">
        <input
        value={result}
        onChange={(e) => setResult(e.target.value)}
        placeholder="Enter stock symbol"
        />
        <button onClick={fetchStock} className='search'>Search</button>
      </div>
      
      {data && typeof(data) == "object" && (
        <div style={{ marginTop: "1rem" }}>
          <h2><span style={{textDecoration: "underline", textDecorationColor:"whitesmoke"}}>{symbol}</span></h2>
          <h2>Current Price: ${data.c}</h2>
          <p>Last Close Price: ${data.pc}</p>
          <p>Price Percent Change: <span style={{backgroundColor: data.dp >= 0 ? "green" : "red", color:"whitesmoke", padding:"0.5rem"}}>{data.dp}%</span>
          </p>
        </div>
      )}
      {data && typeof(data) == "string" && (
        <div style={{ color: "whitesmoke", marginTop: "1rem" }}>
          <h2>{data}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
