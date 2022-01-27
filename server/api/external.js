const express = require("express");
const externalRouter = express.Router();
const axios = require('axios');
const { X_RAPIDAPI_KEY } = process.env;

const generateASIN = (length) => {
  var result = "B0";
  var characters = "ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

externalRouter.get("/product", (req, res) => {
  console.log(X_RAPIDAPI_KEY, "HERE");
  // const options = {
  //   method: "GET",
  //   url: "https://amazon-product-reviews-keywords.p.rapidapi.com/product/reviews",
  //   params: {
  //     asin: "B07XQXZXJC",
  //     page: "1",
  //     country: "US",
  //     filter_by_star: "1",
  //     variants: "1",
  //     top: "0",
  //   },
  //   headers: {
  //     "x-rapidapi-host": "amazon-product-reviews-keywords.p.rapidapi.com",
  //     "x-rapidapi-key": X_RAPIDAPI_KEY,
  //   },
  // };

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
});

module.exports = externalRouter;
