import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function AdvancedImpactChart({ data, t }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!window.__charts) window.__charts = {};
    window.__charts["line-chart"] = chartRef.current;
  }, []);

  const chartData = {
    labels: [
      t.advancedChart.today,
      t.advancedChart.month3,
      t.advancedChart.month6,
      t.advancedChart.year1
    ],
    datasets: [
      {
        label: t.advancedChart.paperProcess,
        data: [
          data.totalHand,
          data.totalHand * 3,
          data.totalHand * 6,
          data.totalHand * 12
        ],
        borderColor: "#170456",
        backgroundColor: "rgba(23,4,86,0.15)",
        tension: 0.35,
        fill: true
      },
      {
        label: t.advancedChart.digital,
        data: [
          data.totalDigital,
          data.totalDigital * 3,
          data.totalDigital * 6,
          data.totalDigital * 12
        ],
        borderColor: "#8750E5",
        backgroundColor: "rgba(135,80,229,0.15)",
        tension: 0.35,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: {
      y: { beginAtZero: true },
      x: { grid: { display: false } }
    }
  };

  return (
    <div className="card-tile card-hover fade-section">
      <h4 className="section-headline">{t.advancedChart.title}</h4>
      <Line ref={chartRef} id="line-chart" data={chartData} options={chartOptions} />
    </div>
  );
}