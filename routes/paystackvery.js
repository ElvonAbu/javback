const axios = require('axios');
const dotenv=require('dotenv');
require('dotenv').config();
const paystackKey=process.env.pay

async function verifyPaystackPayment(reference) {

  try {
    const response = await axios.get(
      `https://api.paystack.co/transfer/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${paystackKey}`
        }
      }
    );

    const result = response.data;

    if (!result.status || result.data.status !== 'success') {
      throw new Error('Payment not verified');
    }

    return result.data;
  } catch (error) {
    console.error('Paystack Verification Error:', error.message);
    throw new Error('Error verifying payment with Paystack');
  }
}

module.exports = verifyPaystackPayment;
