var axios = require('axios').default;

var options = {
  method: 'GET',
  url: 'https://alpha-vantage.p.rapidapi.com/query',
  params: {
    from_currency: 'HBAR',
    function: 'CURRENCY_EXCHANGE_RATE',
    to_currency: 'USD',
  },
  headers: {
    'x-rapidapi-key': 'ADD TOMORROW',
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
