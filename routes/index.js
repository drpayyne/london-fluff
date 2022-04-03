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
  for (let index = 0; index < 5; index++) {
    dice[index] = index < count ? randomatic('?', 1, { chars: '23456X' }) : 0;
  }
  return dice;
};

router.get('/', function (req, res, next) {
  const player = req.query.player || '';
  const dice = player ? players[player] : [];

  console.log('Rendering player', player);

  res.render('index', {
    player,
    dice,
    bid,
    activePlayer,
  });
});

router.get('/refresh', function (req, res, next) {
  const data = {
    bid,
    activePlayer,
  };

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
});

router.post('/', function (req, res, next) {
  const player = req.body.player;
  players[player] = players[player].length ? players[player] : randomize(5);

  res.render('index', { player, dice: players[player], bid, activePlayer });
});

router.post('/bid', function (req, res, next) {
  const player = req.body.player;
  const count = req.body.count;
  const value = req.body.value;

  activePlayer = activePlayer == 'RED' ? 'GREEN' : 'GREEN' ? 'BLUE' : 'RED';

  console.log(player, 'completed');
  console.log(activePlayer, 'to play');

  bid.count = count;
  bid.value = value;

  res.render('index', { player, dice: players[player], bid, activePlayer });
});

module.exports = router;
