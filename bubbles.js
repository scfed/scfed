// bubbles.js
// Takes care of managing and drawing the bubbles.

// types of balls
var BUBBLE_PP = 0;
var BUBBLE_PM = 1;
var BUBBLE_TP = 2;
var BUBBLE_TM = 3;

// how big are the balls?
var BUBBLE_RADIUS = 10;
var BUBBLE_DIA = BUBBLE_RADIUS * 2;

// how long are rows?
var BUBBLE_ROW_LENGTH = 6;

// list of rows from top to bottom.
// each row is an array of types.
// TODO: make this dynamically generated, perhaps with a seed?
var bubbleRows = [
	[BUBBLE_PP, BUBBLE_PM, BUBBLE_TP, BUBBLE_TP, BUBBLE_TM, BUBBLE_TP],
	[BUBBLE_PM, BUBBLE_PP, BUBBLE_TP, BUBBLE_PM, BUBBLE_TP, BUBBLE_TM],
	[BUBBLE_TP, BUBBLE_TP, BUBBLE_PM, BUBBLE_PP, BUBBLE_PM, BUBBLE_PM]
]

// images
var bubbleImages = [
	new Image(),
	new Image(),
	new Image(),
	new Image()
]

bubbleImages[0].src = "img/bubble_pp.png";
bubbleImages[1].src = "img/bubble_pm.png";
bubbleImages[2].src = "img/bubble_tp.png";
bubbleImages[3].src = "img/bubble_tm.png";

// draw the balls with the top-left corner at (x, y)
function bubblePaint(ctx, x, y)
{
	var i;
	var j;
	
	for (i=0; i<bubbleRows.length; i++)
	{
		for (j=0; j<6; j++)
		{
			var type = bubbleRows[i][j];
			var img = bubbleImages[type];
			
			ctx.drawImage(img, x+BUBBLE_DIA*j, y+BUBBLE_DIA*i);
		};
	};
};
