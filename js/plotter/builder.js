export class Builder {
  constructor (elem) {
    this.elem = elem;
    this.canvas = document.createElement('canvas');
    this.canvas.id = `${this.elem.id}-canvas`;
    this.elem.appendChild(this.canvas);
  };

  build(chart, height) {
    const ctx = this.canvas.getContext('2d');

    this.canvas.width = this.elem.offsetWidth;
    this.canvas.height = height;

    const xMin = chart.columns.x[0];
    const xMax = chart.columns.x.slice(-1).pop();

    const [ yMin, yMax ] = Object.keys(chart.names).map(key => [
      chart.columns[key].reduce((min, cur) => min < cur ? min : cur),
      chart.columns[key].reduce((max, cur) => max > cur ? max : cur),
    ]).reduce((res, cur) => [
      cur[0] < res[0] ? cur[0] : res[0],
      cur[1] > res[1] ? cur[1] : res[1],
    ]);

    if (xMin === xMax || yMin === yMax) {
      console.warn('To few points to plot');
      return;
    }

    const xScale = this.canvas.width / Math.abs(xMax - xMin);
    const yScale = this.canvas.height / Math.abs(yMax - yMin);

    Object.keys(chart.names).forEach(key => {
      if (chart.types[key] === 'line') {
        ctx.strokeStyle = chart.colors[key];
        ctx.beginPath()
        chart.columns[key].forEach((_y, i) => {
          const x = (chart.columns.x[i] - xMin) * xScale;
          const y = this.canvas.height - (_y - yMin) * yScale;
          if (i === 0) {
            ctx.moveTo(x,y);
          } else {
            ctx.lineTo(x,y);
          }
        });
        ctx.stroke();
      }
    });
  };
};
