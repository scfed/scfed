// game.js
// Main file.
// NOTE: I suggest you talk to Mariusz if you want to edit this.

var gameCanvasContext;

function gameLoop()
{
  bubblePaint(gameCanvasContext, 20, 20);
  // TODO: call setTimeout again, once updates will actually be needed.
};

function gameLoad()
{
  gameCanvasContext = document.getElementById("game_canvas").getContext('2d');
  setTimeout(gameLoop, 1);
  bubblePlace(3, 0, BUBBLE_TP);
};
