const express = require('express');
const randomatic = require('randomatic');

const router = express.Router();

const players = {
  RED: [],
  GREEN: [],
  BLUE: [],
};

const bid = {};

let activePlayer = 'RED';

const randomize = (count) => {
  const dice = [];
  for (let index = 0; index < count; index++) {
    dice.push(randomatic('?', 1, { chars: '23456X' }));
  }
  return dice;
};

router.get('/', function (req, res, next) {
  res.render('index', { player: '', dice: players[activePlayer], bid, activePlayer });
});

router.post('/', function (req, res, next) {
  const player = req.body.player;
  players[player] = players[player].length ? players[player] : randomize(5);

  res.render('index', { player, dice: players[player], bid, activePlayer });
});

router.post('/bid', function (req, res, next) {
  const player = activePlayer;
  const count = req.body.count;
  const value = req.body.value;

  activePlayer = activePlayer == 'RED' ? 'GREEN' : 'GREEN' ? 'BLUE' : 'RED';

  bid.count = count;
  bid.value = value;

  res.render('index', { player, dice: players[player], bid, activePlayer });
});

module.exports = router;
