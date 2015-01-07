//this is a gun.js At this moment in time I've got no idea what I'm doing

//I need to make like, a rotating bit.
var gunAngle = 0;
var gunBaseImage = new Image();
var gunRotateImage = new Image();
gunBaseImage.src = "img/gunBase.png"
gunRotateImage.src = "img/gunRotate.png"
function gunDraw(ctx, x, y)
{
  //DRAWING A GUN
  ctx.drawImage(gunBaseImage, x, y);
  ctx.rotate(gunAngle);
  ctx.drawImage(gunRotateImage, x, y);
  ctx.rotate(-gunAngle);
  
}
function gunRotate()
{
  //ROTATING A GUN
}
