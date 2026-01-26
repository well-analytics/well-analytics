import React from "react";
import Plot from "react-plotly.js";
import { interpolateViridis } from "d3-scale-chromatic";

/**
 * logs: array of objects with:
 *  - Delta_Time: number[]
 *  - pn_saphir: number[]
 *  - derivative_saphir: number[]
 */
const PlotTIFamily = ({ logs }) => {
  const numLogs = logs.length;

  const getLogBounds = (values) => {
    const filtered = values.filter((v) => v > 0 && Number.isFinite(v));
    return [Math.min(...filtered), Math.max(...filtered)];
  };

  const allTimes = logs.flatMap((log) => log.Delta_Time);
  const allValues = logs.flatMap((log) => [
    ...log.pn_saphir,
    ...log.derivative_saphir,
  ]);

  const [xMin, xMax] = getLogBounds(allTimes).map(Math.log10);
  const [yMin, yMax] = getLogBounds(allValues).map(Math.log10);

  const traces = logs.flatMap((log, i) => {
    const color = interpolateViridis(numLogs === 1 ? 0.5 : i / (numLogs - 1));

    return [
      // Pressure transient (circles)
      {
        x: log.Delta_Time,
        y: log.pn_saphir,
        type: "scattergl",
        mode: "markers",
        name: `Pressure Transient #${i + 1}`,
        marker: {
          color,
          size: 6,
          symbol: "circle",
        },
      },
      // Derivative transient (crosses)
      {
        x: log.Delta_Time,
        y: log.derivative_saphir,
        type: "scattergl",
        mode: "markers",
        name: `Derivative Transient #${i + 1}`,
        marker: {
          color,
          size: 6,
          symbol: "x",
          line: {
            width: 0.4,
            color,
          },
        },
      },
    ];
  });

  return (
    <Plot
      data={traces}
      layout={{
        paper_bgcolor: "#ffdbdb",
        // Set the inner plot area background to white
        plot_bgcolor: "#ffdbdb",
        autosize: true,
        height: 700,
        xaxis: {
          type: "log",
          // HARD LIMITS (linear values)
          minallowed: xMin - (xMax - xMin) * 0.1,
          maxallowed: xMax + (xMax - xMin) * 0.1,

          title: {
            text: "Time [hr]",
            font: { size: 20 },
          },
          tickfont: { size: 16 },
          gridcolor: "rgba(0,0,0,0.35)",
        },

        yaxis: {
          type: "log",
          // HARD LIMITS (linear values)
          minallowed: yMin - (yMax - yMin) * 0.1,
          maxallowed: yMax + (yMax - yMin) * 0.1,

          title: {
            text: "Pressure & Derivative [bar]",
            font: { size: 20 },
          },
          tickfont: { size: 16 },
          gridcolor: "rgba(0,0,0,0.35)",
        },

        margin: {
          l: 80,
          r: 200,
          t: 40,
          b: 60,
        },
      }}
      config={{
        responsive: true,
        scrollZoom: true, // mouse-wheel zoom
        displaylogo: false,
        modeBarButtonsToRemove: ["lasso2d", "select2d"],
      }}
      style={{ width: "100%" }}
    />
  );
};

export default PlotTIFamily;
