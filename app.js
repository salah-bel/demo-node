const express = require("express");
const app = express();
const morgan = require("morgan");
const logger = require("./logger");
const path = require("path");
const mongoose = require("mongoose");
const ejs = require("ejs");
const Product = require("./models/Product");
const Game = require("./models/Game");
//db
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("database Connected!"))
  .catch((err) => console.log("ERROR DB ::", err));

//test

// middlewares
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.static(path.join(__dirname, "node_modules", "bootstrap", "dist"))
);
app.use(express.urlencoded({ extended: true }));

// routes
// get all games
app.get("/", async (req, res) => {
  try {
    let games = await Game.find();
    res.render("games", { games });
  } catch (error) {
    console.log(error);
  }
});
// get one game and show it
app.get("/detail-game/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    let game = await Game.findById(req.params.id);
    console.log(game);
    res.render("detail-game", { game });
  } catch (error) {
    console.log(error);
  }
});
// add new game
app.get("/new-game", (req, res) => {
  res.render("new-game");
});

app.post("/new-product", async (req, res) => {
  try {
    let product = new Product(req.body);
    let newProduct = product.save();
    console.log(newProduct.name + " s'est bien enregistré");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

// delete one game
app.get("/delete-game/:id", async (req, res) => {
  try {
    let game = await Game.findOneAndDelete({ _id: req.params.id });
    console.log(game.title, "deleted success");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.get('/edit-game/:id', async (req, res)=>{
  try {
    let game = await Game.findById(req.params.id);
    console.log(game);
    res.render('new-game', {game})
  } catch (err) {
    console.log(err);
  }
})
// edit one game logic
app.post("/edit-game", async (req, res) => {
  let id = req.body.id
  let update = {
    title: req.body.title,
    // thumbnail: req.body.thumbnail,
    // short_description: req.body.short_description,
    // game_url: req.body.game_url,
    // genre: req.body.genre,
    // platform: req.body.platform,
    // publisher: req.body.publisher,
    // developer: req.body.developer,
    // release_date: req.body.release_date,
    // freetogame_profile_url: req.body.freetogame_profile_url,
  };
  try {
    let game = await Game.findOneAndUpdate({ _id: id }, update);
    console.log(game.title, "updated success");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

// server
app.listen(3005, () => {
  console.log("listening on http://localhost:3005");
});
