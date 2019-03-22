import { Plotter } from './plotter/plotter.js';

window.addEventListener('DOMContentLoaded', () => {
  // Lets load charts data
  const charts = [];
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://psykespb.github.io/chart_data.json', true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      charts.splice(0,0,...JSON.parse(xhr.response).map(chart => {
        const { names, colors, types } = chart;
        const columns = {};
        chart.columns.forEach(col => {
          columns[col[0]] = col.slice(1);
        });
        return {
          names,
          colors,
          types,
          columns,
        };
      }));

      // If data is loaded, lets init our plotter objects
      charts.forEach((chart, index) => {
        const nav_el = document.querySelector(`#chart-${index}-nav`)
        const plotter = new Plotter(chart, nav_el);
        console.log(plotter);
      });

    } else {
      console.error('Failed to load charts data');
    }
  }
  xhr.send();
});
