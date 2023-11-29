const Item = require('../models/Item')
const express = require("express");
const app = express();
require('dotenv').config()

exports.searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const results = await Item
        .find({
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-photo");
      res.json(results);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };

