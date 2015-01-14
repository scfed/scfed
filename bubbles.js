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
var BUBBLE_ROW_LENGTH = 12;

// list of rows from top to bottom.
// each row is an array of types.
// TODO: make this dynamically generated, perhaps with a seed?
var bubbleRows = [
	[BUBBLE_PP, BUBBLE_PM, BUBBLE_TP, BUBBLE_TP, BUBBLE_TM, BUBBLE_TP, BUBBLE_PP, BUBBLE_PM, BUBBLE_TP, BUBBLE_TP, BUBBLE_TM, BUBBLE_TP],
	[BUBBLE_PM, BUBBLE_PP, BUBBLE_TP, BUBBLE_PM, BUBBLE_TP, BUBBLE_PM, BUBBLE_PP, BUBBLE_TP, BUBBLE_PM, BUBBLE_TP, BUBBLE_TP],
	[BUBBLE_TP, BUBBLE_TP, BUBBLE_PM, BUBBLE_PP, BUBBLE_PM, BUBBLE_PM, BUBBLE_TP, BUBBLE_TP, BUBBLE_PM, BUBBLE_PP, BUBBLE_PM, BUBBLE_PM]
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
		for (j=0; j<BUBBLE_ROW_LENGTH; j++)
		{
			var type = bubbleRows[i][j];
			if (type != undefined)
			{
				var img = bubbleImages[type];

				// so if 'i' (row number) is odd-indexed, offset=BUBBLE_RADIUS otherwise offset=0.
				var offset = (i % 2) * BUBBLE_RADIUS;

				ctx.drawImage(img, x+offset+BUBBLE_DIA*j, y+BUBBLE_DIA*i);
			};
		};
	};
};

// this is called when a bubble of the specififed type pops, we must
// make this cooperate with Scott's code to control the graph.
function bonBubblePop(type)
{
	// TODO
};

var bubblesToPop = [];

// pop bubbles starting at pos, and go left, right and then upwards.
// also specify what bubble type to pop. Return true if any bubbles
// at all were popped, false otherwise. This function does not actually
// remove the balls from the screen; instead, it lists their positions in
// the bubbleToPop list.
function bubblePop(rowIndex, pos, type)
{
	if (bubbleRows[rowIndex][pos] != type)
	{
		return false;
	};
	
	// pop the bubble itself
	bubblesToPop.push([rowIndex, pos]);
	
	// pop to the left
	var startPos = pos;
	while ((bubbleRows[rowIndex][pos-1] == type) && (pos != 0))
	{
		bubblesToPop.push([rowIndex, pos-1]);
		pos -= 1;
	};
	
	// pop to the right
	pos = startPos;
	while ((bubbleRows[rowIndex][pos+1] == type) && (pos != BUBBLE_ROW_LENGTH-1))
	{
		bubblesToPop.push([rowIndex, pos+1]);
		pos += 1;
	};
	
	// try upwards
	if (rowIndex > 0)
	{
		var shouldTryAnother = true;
		if (pos > 0)
		{
			if (bubblePop(rowIndex-1, pos-1, type))
			{
				shouldTryAnother = false;
			};
		};
		
		if (shouldTryAnother)
		{
			bubblePop(rowIndex-1, pos, type);
		};
	};
	
	return true;
};

// place a ball on some row at some position
function bubblePlace(rowIndex, pos, type)
{
	if (rowIndex == bubbleRows.length)
	{
		var newRow = [];
		var i;
		for (i=0; i<BUBBLE_ROW_LENGTH; i++)
		{
			newRow.push(undefined);
		};
		bubbleRows.push(newRow);
	};

	bubbleRows[rowIndex][pos] = type;
	bubblesToPop = [];
	bubblePop(rowIndex, pos, type);
	
	if (bubblesToPop.length >= 3)
	{
		var i;
		for (i=0; i<bubblesToPop.length; i++)
		{
			var coords = bubblesToPop[i];
			bubbleRows[coords[0]][coords[1]] = undefined;
		}
	};
};
