const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { config } = require('dotenv');

// Load environment variables from .env file
config();

const app = express();
const port = 3000; // Change this to your desired port

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route to handle Slack's verification request
app.post('/slack/events', async (req, res) => {
  const { challenge, type } = req.body;

  console.log('New Slack event received => ', req.body);

  if (type === 'url_verification') {
    res.status(200).json({ challenge });
  } else {
    res.status(200).send('Event received');
    const data = await makePmRequest(req.headers, req.body, req.params);
    console.log('Data from Postman:', data);
  }
});

async function makePmRequest(headers, body, params) {
    try{
        // Make headers host match postmans webhook
        headers.host = "newman-api.getpostman.com";

        // Forward received events to Postmans webhook API
        const response = await axios({
            method: 'post',
            url: process.env.POSTMAN_WEBHOOK_URL,
            headers,
            data: body,
            params
        });
        return response.data;
    }catch(err){
        console.error('', err);
        throw new Error("Error making webhook request:", err);
    }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
