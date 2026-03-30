// Neutral offerPdf.js Template – No personal data included
// Uses placeholders for all dynamic fields.

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOfferPDF(data) {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  // ------------------------------------------
  // ✅ COVER PAGE (Neutral, vektorbasierter Stil)
  // ------------------------------------------
  pdf.setFillColor(23, 4, 86);
  pdf.rect(0, 0, 210, 80, "F"); // Purple header block

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(26);
  pdf.text("Offerte", 20, 30);

  pdf.setFontSize(14);
  pdf.text("Digital Onboarding", 20, 45);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(28);
  pdf.text("intrum", 105, 270, { align: "center" });

  pdf.addPage();

  // ------------------------------------------
  // ✅ PAGE 2 – Company & Contact placeholders
  // ------------------------------------------
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(23, 4, 86);
  pdf.text("Offerte", 20, 20);

  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.setFont("helvetica", "normal");
  pdf.text("Ausgearbeitet von:", 20, 35);

  pdf.text("[ANBIETER_NAME]", 20, 45);
  pdf.text("[ANBIETER_ADRESSE]", 20, 52);

  pdf.text("für:", 20, 67);

  // Company Table
  autoTable(pdf, {
    startY: 75,
    head: [["Feld", "Wert"]],
    body: [
      ["Firmenname", data.company || ""],
      ["UID", data.uid || ""],
      ["Handelsregister (Ja/Nein)", data.hrRegister || ""],
      ["Strasse / Nr", data.street || ""],
      ["PLZ / Ort", `${data.postcode || ""} ${data.city || ""}`],
      ["Postfach", data.poBox || ""],
      ["PLZ / Ort (Postfach)", data.poPostcode || ""],
      ["Kontaktperson", data.contactName || ""],
      ["Funktion / Abteilung", data.contactRole || ""],
      ["Telefon", data.contactPhone || ""],
      ["E-Mail", data.contactEmail || ""],
    ],
    headStyles: { fillColor: [230, 230, 230] },
    styles: { font: "helvetica", fontSize: 10 },
    margin: { left: 20, right: 20 },
  });

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
