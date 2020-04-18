const express = require("express");
const router = express.Router();
const Currency = require("../models/currency.model");

function validator(currencyName, currencyCode) {
  const lineReader = require("n-readlines");
  const codes = new lineReader("./codes.txt");
  let state = 0;
  let line;
  while ((line = codes.next())) {
    let part = line.toString().split(",");
    if (currencyCode === part[0] && currencyName === part[1]) {
      state = 1;
      break;
    } else state = 0;
  }
  return state === 1 ? true : false;
}

router.route("/").get(async (req, res) => {
  await Currency.find()
    .then((rates) => res.json(rates))
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/").post(async (req, res) => {
  const currencyName = req.body.currencyName;
  const currencyCode = req.body.currencyCode;
  const rateToEuro = Number(req.body.rateToEuro);
  let state = validator(currencyName, currencyCode);
  if (state) {
    const newCurrency = new Currency({
      currencyName,
      currencyCode,
      rateToEuro,
    });
    await newCurrency
      .save()
      .then((currency) => res.json(currency))
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    res.status(400).json("Error with currency code or name");
  }
});

router.route("/:code").delete(async (req, res) => {
  await Currency.remove({ currencyCode: req.params.code })
    .then((currency) => res.json(currency))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:code").patch(async (req, res) => {
  if (req.body.rateToEuro != null) {
    await Currency.updateOne(
      { currencyCode: req.params.code },
      { rateToEuro: req.body.rateToEuro }
    )
      .then((currency) => res.json(currency))
      .catch((err) => res.status(400).json("Error: " + err));
  }
});

module.exports = router;
