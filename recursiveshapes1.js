//REURSIVE SHAPES

function setup()
{

  createCanvas(400,400);
  background(0);

}

function draw()
{

  /*
  Translating to center of canvas.
  */
  translate(width/2,height/2);
  fractal(0,0,80);

}

function fractal(x,y,s)
{

  //HERE WE CREATE A RECURSIVE SHAPE
  /*
  First we start off with a simple,
  defintion of the original shape.
  We use parameters since we can manipulate
  the whole shape later on.
  */
  noFill();
  stroke(255,0,100);
  ellipse(x,y,s,s);

  /*
  Here we call the shape within itself
  at different places
  */
  if(s > 10)
  {

    //LEFT AND RIGHT
    fractal(x + s/2,y,s/2);
    fractal(x - s/2,y,s/2);

    //TOP AND DOWN
    fractal(x,y + s/2,s/2);
    fractal(x,y - s/2,s/2);

    //DIAGONALLY
    fractal(x + s,y + s,s/4);
    fractal(x - s,y - s,s/4);
    fractal(x - s,y + s,s/4);
    fractal(x + s,y - s,s/4);

    //IN BETWEEN
    fractal(x + s,y + s,s/2);
    fractal(x - s,y + s,s/2);
    fractal(x + s,y - s,s/2);
    fractal(x - s,y - s,s/2);

  }

}
