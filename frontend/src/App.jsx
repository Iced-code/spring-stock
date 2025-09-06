import './App.css';

import { useState, useEffect } from "react";

function App() {
  const [symbol, setSymbol] = useState("AAPL");
  const [data, setData] = useState(null);

  const fetchStock = async () => {
    const res = await fetch(`http://localhost:8080/api/quote?symbol=${symbol}`);
    const json = await res.json();
    setData(json);
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h1>Stock Price Checker</h1>
      <input
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock symbol"
      />
      <button onClick={fetchStock}>Get Quote</button>

      {data && (
        <div style={{ marginTop: "1rem" }}>
          <h2>{symbol}</h2>
          <p>Current Price: ${data.c}</p>
          <p>Open: ${data.o}</p>
          <p>High: ${data.h}</p>
          <p>Low: ${data.l}</p>
        </div>
      )}
    </div>
  );
}

export default App;
