import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(phoneNumber);
  };

  const fetchData = (query) => {
    axios.post('https://i31rmr8cef.execute-api.ap-south-1.amazonaws.com/vanity-numbers', {
      "phoneNumber": query
    })
      .then(response => {
        setResult(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Enter Phone number:
          <input type="text" value={phoneNumber} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Top Vanity Numbers:</h2>
        <ul>
          <pre>
            {JSON.stringify(result, null, 2)}
          </pre>
        </ul>
      </div>
    </div>
  );
}

export default App;
