const { ethers } = require('ethers');
const axios = require("axios");

async function fetchPools() {
  const query = `
    {
      pools(first: 5) {
        id
        token0 {
          id
          symbol
          name
        }
        token1 {
          id
          symbol
          name
        }
        liquidity
        volumeUSD
      }
    }
  `;

  try {
    const response = await axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
      query: query, // Corrected key here
    });

    const data = response.data;
    console.log(data.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

fetchPools();
