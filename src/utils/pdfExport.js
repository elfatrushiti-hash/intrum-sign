import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// High‑Resolution ChartJS Export (2x DPI)
function chartImage(id) {
  if (!window.__charts || !window.__charts[id]) return null;
  return window.__charts[id].toBase64Image("image/png", 2.0);
}

export function exportPDF(data, t) {
  const pdf = new jsPDF("p", "mm", "a4");

  /* -------------------------
     PAGE 1 — TITLE PAGE
  ------------------------- */
  pdf.setFillColor(23, 4, 86);
  pdf.rect(0, 0, 210, 297, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(32);
  pdf.setTextColor(255, 255, 255);
  pdf.text("SIGN Impact Report", 20, 45);

  pdf.setFontSize(16);
  pdf.text(
    "Einsparungsanalyse – digital vs traditionell",
    20,
    65
  );

  pdf.setFontSize(12);
  pdf.text("Datum: " + new Date().toLocaleDateString(), 20, 85);

  pdf.addPage();


  /* -------------------------
     PAGE 2 — KPI TABLE + DONUT
  ------------------------- */
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(23, 4, 86);
  pdf.text("KPI Analyse", 20, 20);

  const kpis = [
    [t.kpi.handwritten, data.totalHand.toFixed(2) + " CHF"],
    [t.kpi.digital, data.totalDigital.toFixed(2) + " CHF"],
    [t.kpi.timeSaved, data.timeSaved.toFixed(2) + " h"],
    [t.kpi.moneySaved, data.moneySaved.toFixed(2) + " CHF"],
    [t.kpi.co2Saved, data.co2Saved.toFixed(2) + " kg"]
  ];

  autoTable(pdf, {
    head: [["Kategorie", "Wert"]],
    body: kpis,
    startY: 30,
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
    styles: { fontSize: 11 }
  });

  // High DPI Donut Chart
  const donut = chartImage("donut-chart");
  if (donut) {
    pdf.addImage(donut, "PNG", 25, 90, 160, 160);
  }

  pdf.addPage();


  /* -------------------------
     PAGE 3 — TABLES + CHARTS
  ------------------------- */
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(23, 4, 86);
  pdf.text("Vergleich & Trends", 20, 20);

  // Benchmark
  autoTable(pdf, {
    startY: 30,
    head: [["Kategorie", "Wert"]],
    body: [
      [t.benchmark.avgCost, "8.50 CHF"],
      [
        t.benchmark.yourCost,
        (data.totalHand / (data.docs * data.signs)).toFixed(2) + " CHF"
      ]
    ],
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
    styles: { fontSize: 11 },
  });

  // Comparison
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 10,
    head: [[t.comparison.category, t.comparison.paper, t.comparison.digital]],
    body: [
      [t.comparison.cost, data.totalHand.toFixed(2), data.totalDigital.toFixed(2)],
      [t.comparison.time, "0", data.timeSaved.toFixed(2)],
      [t.comparison.co2, "0", data.co2Saved.toFixed(2)],
    ],
    styles: { fontSize: 11 },
  });

  let y = pdf.lastAutoTable.finalY + 20;

  // Line Chart – High DPI
  const line = chartImage("line-chart");
  if (line) {
    pdf.addImage(line, "PNG", 15, y, 180, 70);
    y += 80;
  }

  // CO2 Chart – High DPI
  const co2 = chartImage("co2-chart");
  if (co2) {
    pdf.addImage(co2, "PNG", 15, y, 180, 70);
  }

  pdf.save("SIGN_Impact_Report.pdf");
}