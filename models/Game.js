const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
    name: String,
    price: Number,
  });
  const Product = mongoose.model("Product", productSchema);
  

  module.exports = Product;