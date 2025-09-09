import './App.css';

import { useState, useEffect } from "react";

function App() {
  const [symbol, setSymbol] = useState("");
  const [result, setResult] = useState(null);
  const [data, setData] = useState(null);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchStock = async () => {
    if(result.toLowerCase() === "hi backend!"){
      const res = await fetch(`http://localhost:8080/api/hello`);
      const text = await res.text();
      setData(text);
    } 
    else {
      try {
        const res = await fetch(`http://localhost:8080/api/quote?symbol=${result}`);
        const json = await res.json();

        if(json.d !== null){
          setData(json);
          setSymbol(result);
          setResult("");
        }
        else {
          const text = "Error in getting stock info.";
          setData(text);
        }
      }
      catch (error) {
        const text = "Error in getting info.";
        setData(text);
      }
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h1 style={{ color:"#4d75b4"}}>Stock Price Checker</h1>
      <div className="searchbar">
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
          <h2>Current Price: ${data.c.toFixed(2)}</h2>
          <p>Last Close Price: ${data.pc.toFixed(2)}</p>
          <p>Price Percent Change: <span style={{backgroundColor: data.dp >= 0 ? "green" : "red", color:"whitesmoke", padding:"0.5rem"}}>{data.dp.toFixed(2)}%</span>
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
