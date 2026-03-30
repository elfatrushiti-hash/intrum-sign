import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CO2Chart({ data, t }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!window.__charts) window.__charts = {};
    window.__charts["co2-chart"] = chartRef.current;
  }, []);

  const chartData = {
    labels: [t.co2Counter.title, t.charts.digital],
    datasets: [
      {
        label: t.co2Counter.subtitle,
        data: [data.co2Saved + 10, 10],
        backgroundColor: ["#170456", "#8750E5"],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="card-tile card-hover fade-section">
      <h4 className="section-headline">{t.co2Counter.title}</h4>
      <Bar ref={chartRef} id="co2-chart" data={chartData} />
    </div>
  );
}