const express = require("express");
const app = express();
const morgan = require("morgan");
const logger = require("./logger");
const path = require("path");
const mongoose = require("mongoose");
const ejs = require('ejs')
const Product = require('./models/Product');
//db
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("database Connected!"))
  .catch((err) => console.log("ERROR DB ::", err));


// middlewares
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules','bootstrap', 'dist')))
app.use(express.urlencoded({ extended: true }));

// routes
// get all products
app.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    res.render('home', {products});
  } catch (error) {
    console.log(error);
  }
});

app.get('/detail-product/:id', async (req,res) => {
  console.log(req.params.id);
  try{
    let product =await Product.findById(req.params.id);
    console.log(product)
    res.render('detail-product' , {product})
  }
  catch (error) {
    console.log(error);
  }
})

app.get('/new-product', (req, res)=>{
  res.render('new-product')
})

app.post('/new-product', async(req, res)=>{
  
  try {
    let product = new Product(req.body)
    let newProduct = product.save();
    console.log(newProduct.name + " s'est bien enregistré")
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }

})

// server
app.listen(3005, () => {
  console.log("listening on http://localhost:3005");
});
