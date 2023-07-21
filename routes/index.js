const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/fetch-data', function(req, res, next) {
  axios.get('https://api.example.com/data')
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "An error occurred." });
    });
});

module.exports = router;
