document.addEventListener('DOMContentLoaded', function () {
  const player = document.getElementById('player').value;

  console.log('Setting player', player);

  window.history.replaceState(null, null, '?player=' + player);

  const activePlayerElement = document.getElementById('activePlayer');
  const bidCountElement = document.getElementById('bidCount');
  const bidValueElement = document.getElementById('bidValue');

  setInterval(() => {
    fetch('/refresh')
      .then((res) => res.json())
      .then(({ activePlayer, bid }) => {
        activePlayerElement.innerText = activePlayer;

        if (bidCountElement) {
          bidCountElement.innerText = bid.count;
          bidValueElement.innerText = bid.value;
        }
      });
  }, 500);
});
