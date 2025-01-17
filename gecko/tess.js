const axios = require('axios');
let data = JSON.stringify({
   "query": "{\n  ethereum(network: ethereum) {\n    arguments(\n      options: {desc: [\"block.height\",\"index\"], limit: 50}\n      smartContractAddress: {in: \"0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f\", }\n      smartContractEvent: {is: \"PairCreated\"}\n    ) {\n      block {\n        height\n        timestamp{\n          time(format:\"%Y-%m-%d %H:%M:%S\")\n        }\n      }\n      index\n      pair: any(of: argument_value, argument: {is: \"pair\"})\n      token0: any(of: argument_value, argument: {is: \"token0\"})\n      token0Name: any(of: argument_value, argument: {is: \"token0\"}, as: token_name)\n      token1: any(of: argument_value, argument: {is: \"token1\"})\n      token1Name: any(of: argument_value, argument: {is: \"token1\"}, as: token_name)\n    }\n  }\n}",
   "variables": "{}"
});
let newdata=JSON.stringify({
  "email":'elvonabu22@gmail.com',
  "password":'elvontidy'
})

let config = {
   method: 'post',
   //maxBodyLength: Infinity,
   url: 'http://localhost:3000/login/login',
   headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2E0MWI0MTdkMDY3YzE0OTI3YmFlYyIsImVtYWlsIjoiZWx2b25hYnUyMkBnbWFpbC5jb20iLCJpYXQiOjE3MzYwNjU1NDEsImV4cCI6MTczNjA2OTE0MX0.RLz67GgP-GfAMM2FQeK_DjneYVg368t675HgeWDfdTI',
      //'X-API-KEY': 'BQYdXPFJboyPBn4ZKYxMD0vi8rSAUZ4C'
   },
   data : newdata
};

axios.request(config)
.then((response) => {
   console.log(JSON.stringify(response.data));
})
.catch((error) => {
   console.log(error);
});
