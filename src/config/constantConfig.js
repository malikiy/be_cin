const dotenv = require('dotenv');

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
const jwtExpiryTime = process.env.JWT_TOKEN_EXPIRED;
const jwtSecret = process.env.JWT_SECRET;

module.exports = { 
    host,
    port,
    jwtExpiryTime,
    jwtSecret
}