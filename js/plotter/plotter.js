import { Builder } from './builder.js';

export class Plotter {
  constructor(chart, nav_el) {
    this.chart = chart;
    this.nav_el = new Builder(nav_el);
    this.nav_el.build(this.chart, 120);
  };
};
