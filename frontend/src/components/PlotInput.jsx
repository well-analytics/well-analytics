import { useState } from "react";
import Plot from "react-plotly.js";
import { interpolateViridis } from "d3-scale-chromatic";

const PlotInput = ({ df_bhp, df_rate, shutin, flowing }) => {
  const [showTarget, setShowTarget] = useState(false);

  // -----------------------------
  // Colors
  // -----------------------------
  const shutinColor = "#3e6640";

  // -----------------------------
  // Base traces
  // -----------------------------
  const traces = [
    {
      x: df_bhp.Time,
      y: df_bhp.Pressure,
      type: "scatter",
      mode: "markers",
      name: "Pressure",
      marker: { color: "red", size: 2 },
      xaxis: "x",
      yaxis: "y",
    },
    {
      x: df_rate.Time,
      y: df_rate.Rate,
      type: "scatter",
      mode: "markers",
      name: "Rate",
      marker: { color: "blue", size: 2 },
      xaxis: "x2",
      yaxis: "y2",
    },
  ];

  // -----------------------------
  // Interval → Plotly shapes
  // -----------------------------
  const makeIntervalShapes = (intervals, getColor) =>
    intervals["start/hr"]
      .map((start, i) => {
        const end = intervals["end/hr"][i];
        const color = getColor(i);

        return [
          // Top subplot
          {
            type: "rect",
            xref: "x",
            yref: "paper",
            x0: start,
            x1: end,
            y0: 0.55,
            y1: 1,
            fillcolor: color,
            opacity: 0.2,
            line: { width: 0 },
          },
          // Bottom subplot
          {
            type: "rect",
            xref: "x2",
            yref: "paper",
            x0: start,
            x1: end,
            y0: 0,
            y1: 0.45,
            fillcolor: color,
            opacity: 0.2,
            line: { width: 0 },
          },
        ];
      })
      .flat();

  // -----------------------------
  // Flowing interval legend traces
  // -----------------------------
  const makeFlowingLegendTraces = (intervals) => {
    const n = intervals["start/hr"].length;

    return intervals["start/hr"].map((_, i) => ({
      x: [null],
      y: [null],
      type: "scatter",
      mode: "markers",
      name: `Flowing #${i + 1}`,
      marker: {
        color: interpolateViridis(
          n === 1 ? 0.5 : i / (n - 1)
        ),
        size: 12,
        symbol: "square",
      },
      legendgroup: `flowing-${i}`,
      showlegend: true,
    }));
  };

  // -----------------------------
  // Target shapes (conditional)
  // -----------------------------
  const numFlowing = flowing["start/hr"].length;

  const targetShapes = showTarget
    ? [
        // Shut-in
        ...makeIntervalShapes(shutin, () => shutinColor),

        // Flowing (Viridis)
        ...makeIntervalShapes(flowing, (i) =>
          interpolateViridis(
            numFlowing === 1 ? 0.5 : i / (numFlowing - 1)
          )
        ),
      ]
    : [];

  // -----------------------------
  // Add legends when enabled
  // -----------------------------
  if (showTarget) {
    // Shut-in legend
    traces.push({
      x: [null],
      y: [null],
      type: "scatter",
      mode: "markers",
      name: "Shut-in",
      marker: {
        color: shutinColor,
        size: 12,
        symbol: "square",
      },
      showlegend: true,
    });

    // Flowing interval legends
    traces.push(...makeFlowingLegendTraces(flowing));
  }

  // -----------------------------
  // Layout
  // -----------------------------
  const layout = {
    paper_bgcolor: "#ffdbdb",
    plot_bgcolor: "#ffdbdb",
    autosize: true,
    height: 700,
    font: {
      family: "Calibri",
      size: 20,
    },
    grid: {
      rows: 2,
      columns: 1,
      pattern: "independent",
    },
    xaxis: {
      title: { text: "Time [hr]", standoff: 10 },
      automargin: true,
    },
    yaxis: {
      title: { text: "Pressure [bar]", standoff: 10 },
      automargin: true,
    },
    xaxis2: {
      title: { text: "Time [hr]", standoff: 10 },
      automargin: true,
    },
    yaxis2: {
      title: { text: "Rate [STM3/D]", standoff: 10 },
      automargin: true,
    },
    shapes: targetShapes,
    showlegend: true,
    legend: {
      orientation: "v",
      x: 1.02,
      y: 1,
    },
    margin: {
      t: 40,
      b: 40,
      l: 100,
      r: 160,
    },
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <>
      <div style={{ width: "100%" }}>
        <Plot
          data={traces}
          layout={layout}
          config={{ responsive: true }}
          style={{ width: "100%" }}
        />
      </div>

      <button onClick={() => setShowTarget((prev) => !prev)}>
        {showTarget ? "Hide Target Intervals" : "Show Target Intervals"}
      </button>
    </>
  );
};

export default PlotInput;
