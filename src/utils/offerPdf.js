// Neutral offerPdf.js Template – No personal data included
// Uses placeholders for all dynamic fields.

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export function exportOfferPDF(data) {
  const pdf = new jsPDF({
    unit: "mm",
    format: "a4"
  });

  // ✅ Seite 1 (Deckblatt)
  drawCoverPage(pdf);

  // ✅ Seite 2
  pdf.addPage();
  drawCompanyPage(pdf, data);


  // ------------------------------------------
  // ✅ COVER PAGE (Neutral, vektorbasierter Stil)
  // ------------------------------------------
function drawCoverPage(pdf) {
  // Farben
  const purpleDark = [23, 4, 86];
  const purpleMid = [120, 50, 180];
  const purpleSoft = [140, 70, 200];
  const white = [255, 255, 255];

  // Hintergrundfläche
  pdf.setFillColor(...purpleDark);
  pdf.rect(0, 0, 210, 297, "F");

  // Glow 1
  pdf.setFillColor(140, 70, 200, 0.50);
  pdf.circle(40, 60, 60, "F");

  // Glow 2
  pdf.setFillColor(120, 50, 180, 0.30);
  pdf.circle(120, 150, 80, "F");

  // Glow 3
  pdf.setFillColor(150, 80, 210, 0.35);
  pdf.circle(180, 260, 100, "F");

  // Titel
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(30);
  pdf.setTextColor(...white);
  pdf.text("Offerte", 25, 60);

  // Untertitel
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(16);
  pdf.text("Digital Onboarding", 25, 80);

  // Markenname unten
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(32);
  pdf.text("intrum", 105, 265, { align: "center" });
}
  drawCoverPage(pdf);
  pdf.addPage();
 
// ---------------------------------------------
// ✅ Seite 2 – Firmeninformationen (neutral)
// ---------------------------------------------
function drawCompanyPage(pdf, data) {

  const grayLight = [240, 240, 240];
  const textColor = [0, 0, 0];

  // Titel der Seite
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(...textColor);
  pdf.text("Firmeninformationen", 20, 20);

  // Firmen-Tabelle
  autoTable(pdf, {
    startY: 35,
    head: [["Feld", "Wert"]],
    body: [
      ["Firmenname", data.company || ""],
      ["UID", data.uid || ""],
      ["Handelsregister", data.hrRegister || ""],
      ["Strasse / Nr", data.street || ""],
      ["PLZ / Ort", `${data.postcode || ""} ${data.city || ""}`],
      ["Postfach", data.poBox || ""],
      ["PLZ/Ort (Postfach)", data.poPostcode || ""],
      ["Kontaktperson", data.contactName || ""],
      ["Telefon", data.contactPhone || ""],
      ["E-Mail", data.contactEmail || ""],
    ],
    headStyles: { fillColor: grayLight },
    styles: { font: "helvetica", fontSize: 10 },
    margin: { left: 20, right: 20 }
  });
}
  pdf.addPage();
  // ------------------------------------------
  // ✅ PAGE 3 – Inhaltsverzeichnis (Neutral)
  // ------------------------------------------
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text("Inhalt", 20, 20);

  const toc = [
    ["1  Digital Trust Platform – Überblick", "4"],
    ["2  SIGNING", "5"],
    ["3  Setup Gebühren", "6"],
    ["4  Verschwiegenheitsklausel", "6"],
    ["5  Gültigkeit des Angebots", "6"],
  ];

  let y = 35;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);

  toc.forEach((row) => {
    pdf.text(row[0], 20, y);
    pdf.text(row[1], 190, y, { align: "right" });

    // dotted leader
    const dots = ".".repeat(60);
    pdf.text(dots, 20, y);

    y += 10;
  });

  pdf.addPage();

  // ------------------------------------------
  // ✅ PAGE 4 – Kapitel 1 (Neutral)
  // ------------------------------------------
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("1. Digital Trust Platform – Überblick", 20, 20);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  const kap1 =
    "Dieser Abschnitt beschreibt die Digital Trust Platform (DTP) als neutrale Übersicht.\n" +
    "Hier können Sie eigene erläuternde Texte einfügen, die aus Ihrem Offerte-Formular stammen.\n\n" +
    "Kernmodule (Beispiele):\n" +
    "• Identification\n" +
    "• Smart Data\n" +
    "• Signing (EES, FES, QES)\n\n";

  pdf.text(kap1, 20, 35, { maxWidth: 170, lineHeightFactor: 1.4 });

  pdf.addPage();

  // ------------------------------------------
  // ✅ PAGE 5 – SIGNING Tabellen (Neutral)
  // ------------------------------------------
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("2. SIGNING", 20, 20);

  // EES
  autoTable(pdf, {
    startY: 30,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [["Einfache elektronische Signatur (EES)", data.ees || "0.80"]],
    headStyles: { fillColor: [230, 230, 230] },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 },
  });

  // FES
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 10,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [["Fortgeschrittene elektronische Signatur (FES)", data.fes || "1.50"]],
    headStyles: { fillColor: [230, 230, 230] },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 },
  });

  // QES
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 10,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [["Qualifizierte elektronische Signatur (QES)", data.qes || "2.20"]],
    headStyles: { fillColor: [230, 230, 230] },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 },
  });

  // seal.ID
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 12,
    head: [["Volumen pro Jahr", "Preis (CHF)"]],
    body: [
      [data.sealIdVolume || "0–2500", data.sealIdPrice || "28.20"],
    ],
    headStyles: { fillColor: [230, 230, 230] },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 },
  });

  pdf.addPage();

  // ------------------------------------------
  // ✅ PAGE 6 – Setup, Verschwiegenheit, Gültigkeit (Neutral)
  // ------------------------------------------
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("3. Setup Gebühren", 20, 20);

  autoTable(pdf, {
    startY: 30,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [
      ["Setup Fee (einmalig)", "5500.00"],
      ["Ongoing Fee (jährlich)", "2500.00"],
      ["SIGN pro User / Monat", `${(data.signUsers || 0) * 9}.00`],
      ["White Labeling", data.whiteLabeling ? "2500.00" : "—"],
    ],
    headStyles: { fillColor: [230, 230, 230] },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 },
  });

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("4. Verschwiegenheitsklausel", 20, pdf.lastAutoTable.finalY + 20);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.text(
    "Dieser Abschnitt ist neutral gehalten. Hier können Sie eigene Texte zur Vertraulichkeit hinterlegen.",
    20,
    pdf.lastAutoTable.finalY + 35,
    { maxWidth: 170 }
  );

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("5. Gültigkeit des Angebots", 20, pdf.lastAutoTable.finalY + 60);

  pdf.setFont("helvetica", "normal");
  pdf.text(
    `Dieses Angebot ist gültig bis: ${data.validUntil || ""}`,
    20,
    pdf.lastAutoTable.finalY + 75
  );

  // Footer
  pdf.setFontSize(9);
  pdf.setTextColor(100, 100, 100);
  pdf.text("Offerte – Digital Trust Platform", 20, 285);
  pdf.text("intrum AG", 190, 285, { align: "right" });

  // ------------------------------------------
  // ✅ EXPORT
  // ------------------------------------------
  pdf.save(`Offerte_${data.company || "Angebot"}.pdf`);
}
