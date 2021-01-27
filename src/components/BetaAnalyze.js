import {useState} from 'react';
import api from '../data/api';

const BetaAnalyze = () => {
  // Create state variables
  let [responseData, setResponseData] = useState('');
  let [ticker, setTicker] = useState('');
  let [message, setMessage] = useState('');

  // fetches stock data based on parameters
  const fetchData = (e) => {
    e.preventDefault();

    setMessage('Loading...');

    // api.stockTimeSeries(ticker)
    // .then((response)=>{
    //    setResponseData(response.data)
    //    setMessage('')
    //    console.log(response)
    // })
    // .catch((error) => {
    //    setMessage('Error')
    //    console.log(error)
    // })
  };

  return (
    <div
      style={{
        background: '#EEE',
        padding: '5%',
        fontFamily: '"Lucida Console", Monaco, monospace',
      }}>
      <h1
        style={{
          background: 'black',
          color: 'white',
          padding: '1rem',
          display: 'inline-block',
        }}>
        Hedera Hive Crypto Analyze
      </h1>
      <h2>Analyze Crypto Data</h2>
      <form onSubmit={fetchData}>
        <fieldset>
          <legend>Search Crypto Market</legend>
          <label htmlFor="ticker">
            Enter Crypto Ticker
            <input
              required
              name="ticker"
              id="ticker"
              type="text"
              placeholder="$HBAR"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
      <p>{message}</p>
      <h3>Symbol: {responseData ? responseData.symbol : ''}</h3>
      <p>Daily Time Series with Splits and Dividend Events</p>
      <small>Last Refresh: {responseData ? responseData.refreshed : ''}</small>
    </div>
  );
};

export default BetaAnalyze;
