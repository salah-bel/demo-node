const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  short_description: { type: String, required: true },
  game_url: { type: String, required: true },
  genre: { type: String, required: true },
  platform: { type: String, required: true },
  publisher: { type: String, required: true },
  developer: { type: String, required: true },
  release_date: { type: Date, required: true },
  freetogame_profile_url: { type: String, required: true }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;