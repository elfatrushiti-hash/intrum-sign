import React, { useRef, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartsSection({ data, t }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!window.__charts) window.__charts = {};
    window.__charts["donut-chart"] = chartRef.current;
  }, []);

  const chartData = {
    labels: [t.charts.handwritten, t.charts.digital],
    datasets: [
      {
        label: t.charts.label,
        data: [data.totalHand, data.totalDigital],
        backgroundColor: ["#170456", "#8750E5"],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="card-tile card-hover fade-section">
      <h4 className="section-headline">{t.charts.title}</h4>
      <Doughnut ref={chartRef} id="donut-chart" data={chartData} />
    </div>
  );
}