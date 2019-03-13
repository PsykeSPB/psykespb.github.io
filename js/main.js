function draw() {
  // Prepare global variables
  const body = document.querySelector('body');
  const screen = {
    width: body.getBoundingClientRect().width,
    height: body.getBoundingClientRect().height,
  };
  // Prepare canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  canvas.width = screen.width;
  canvas.height = screen.height;
  body.appendChild(canvas);
  // Try to initiate canvas
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    // cover background in black
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, screen.width, screen.height);
  } else {
    console.error('canvas cant be initiated');
  }
};
