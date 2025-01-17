const axios = require('axios');
const url='https://api.geckoterminal.com/api/v2/networks';
const rady='https://api.raydium.io/v2/main/pairs';
const jup='https://quote-api.jup.ag/v6/quote';
const birdeye='https://public-api.birdeye.so/defi/price';
const jupdata={
  inputMint:'So11111111111111111111111111111111111111112',
  outputMint:'2U6JdVrBcweWMbL8wXXu43cFnmqZZNKMhfttFVuBquu8',
  amount:100
}
const params={
  params: {address: 'So11111111111111111111111111111111111111112'}
};
const headers={
  'X-API-KEY':'829c78d3c16847c0a6b98ad5559e822f'
};
const getdata=async()=>{
axios.get(birdeye,{
  params:{
    "address":'So11111111111111111111111111111111111111112'
  },
},{
  headers:{
    'x-chain': 'solana',
    'X-API-KEY':'829c78d3c16847c0a6b98ad5559e822f'
  },
}).then(res=>console.log(res.data)).catch(error=>console.log(error.message));


};
getdata();

const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

async function runApp() {
  await Moralis.start({ apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImQyMmU3OWVmLTQ0YmUtNGM3Yi04YmUxLTM5OWFmOTA0MmZlNiIsIm9yZ0lkIjoiNDEyOTQyIiwidXNlcklkIjoiNDI0MzY0IiwidHlwZUlkIjoiYTAyMDk5NDEtZWI2ZS00MjAxLTgwNTMtYzg2ZTI2ZjVmNzgwIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mjk2Mjc0NDUsImV4cCI6NDg4NTM4NzQ0NX0.BXPyInGinEdK92DGzyp-SxQNIYdh_mJeJAjab5-btUI" });

  const blockNumberOrHash = "21525812";
  const chain = EvmChain.ETHEREUM;

  const response = await Moralis.EvmApi.block.getBlock({
    blockNumberOrHash,
    chain,
  });
  console.log(response.jsonResponse.miner);
}

//runApp();
