import { useState, useEffect } from "react";  //useState y useEffect son hooks de React que permiten manejar el estado y efectos
import "./App.css"; // Importa los estilos

const CurrencyConverter = () => {  // Componente principal de conversor de monedas
  const [amount, setAmount] = useState(1);  // Estado para la cantidad a convertir
  const [fromCurrency, setFromCurrency] = useState("USD"); // Estado para la moneda de origen
  const [toCurrency, setToCurrency] = useState("VES");  // Estado para la moneda de destino
  const [exchangeRate, setExchangeRate] = useState(1);  // Estado para la tasa de cambio
  const [currencies, setCurrencies] = useState([]);   // lista de monedas disponibles (para mostrar en los select).

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")                     // Llama a la API exchangerate-api.com para obtener las tasas de cambio.
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates));                                 // Extrae todas las monedas disponibles y las guarda en currencies.y
        setExchangeRate(data.rates[toCurrency]);                                // Establece la tasa de cambio inicial para la moneda de destino.
      })
      .catch((error) => console.error("Error fetching exchange rates:", error)); // Maneja errores en la API.
  }, [toCurrency]);

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)          // Llama a la API para obtener la tasa de cambio de la moneda de origen.
      .then((res) => res.json())
      .then((data) => setExchangeRate(data.rates[toCurrency]))                   // Establece la tasa de cambio para la moneda de destino.
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, [fromCurrency, toCurrency]);

  const convert = () => (amount * exchangeRate).toFixed(2);                      //Multiplica la cantidad (amount) por la tasa (exchangeRate) //redondea el resultado a 2 decimales usando .toFixed(2)
  
  return (
    <div className="container">
      <h2>Conversor de Monedas</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}  // Cambia el valor de la cantidad a convertir
      />

      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>{currency}</option> // Muestra un selector de monedas
        ))}
      </select>

      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}> //
        {currencies.map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
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
