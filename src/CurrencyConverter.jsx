import { useState, useEffect } from "react";
import "./App.css";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("VES");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates));
        setExchangeRate(data.rates[toCurrency]);
      })
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, [toCurrency]);

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => setExchangeRate(data.rates[toCurrency]))
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, [fromCurrency, toCurrency]);

  const convert = () => (amount * exchangeRate).toFixed(2);

  return (
    <div className="container">
      <h2>Conversor de Monedas</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {" "}
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <button>Convertir</button>

      <div className="result">
        {amount} {fromCurrency} = {convert()} {toCurrency}
      </div>
    </div>
  );
};

export default CurrencyConverter;
