import React from "react";
import { scaleLinear, scaleBand, max } from "d3";

export const BarChart = ({ width, height, data }) => {
  console.log(data);

  const margin = 10;
  const lines = [10, 20, 30, 40];

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.sunshine)])
    .range([0, width - margin]);

  const yScale = scaleBand()
    .domain(data)
    .range([0, height - 2 * margin]);

  const rectangles = data.map((item) => {
    return (
      <rect
        key={item.city}
        x={margin}
        y={yScale(item)}
        height={yScale.bandwidth()}
        width={xScale(item.sunshine)}
        fill="darkorange"
        stroke="#fff"
      />
    );
  });

  const labels = data.map((item) => {
    return (
      <text
        key={item.city}
        x={xScale(item.sunshine)}
        y={yScale(item) + 15}
        fill="#fff"
        textAnchor="end"
      >
        {item.city}
      </text>
    );
  });

  const gridLines = lines.map((line) => (
    <g key={line}>
      <line
        y1={0}
        y2={height - margin}
        x1={xScale(line)}
        x2={xScale(line)}
        stroke="#fff"
      />
      <text
        x={xScale(line)}
        y={height - margin}
        textAnchor="middle"
        fontSize={12}
      >
        {line}
      </text>

      <text
        x={xScale(line)}
        y={height - margin + 15}
        fill="#fff"
        textAnchor="middle"
      ></text>
    </g>
  ));

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      {rectangles}
      {gridLines}
      {labels}
    </svg>
  );
};
