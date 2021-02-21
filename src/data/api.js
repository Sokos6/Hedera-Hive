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
    'x-rapidapi-key': '495d6eb0fdmsh4763db671e0903fp1addbcjsnf2c5df04e70b',
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
