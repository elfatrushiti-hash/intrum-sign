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
  drawCompanyPage(pdf, data);

  // ✅ Seite 3
  drawTableOfContents(pdf);

  // ✅ Seite 4
  drawDTPPage(pdf);
  
 // ✅ Seite 5
  drawSigningPage(pdf, data);

  
  // ✅ Seite 6
  drawFinalPage(pdf, data);

function drawDottedLine(pdf, x, y, width) {
  const dotCount = Math.floor(width / 2); // Menge der Punkte, anpassen falls nötig
  const dots = " ".repeat(dotCount);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(dots, x, y);
}
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
 
// ----------------------------------------------------------
// ✅ Seite 2 – Modernisierte Firmeninformationen (neutral)
// ----------------------------------------------------------
function drawCompanyPage(pdf, data) {

  // Farben & Typo
  const grayLight = [245, 245, 245];
  const grayBorder = [210, 210, 210];
  const grayText = [70, 70, 70];
  const titleColor = [23, 4, 86]; // Purple Accent

  // Page Margins
  const marginLeft = 20;
  const marginTop = 22;

  // ----------------------------------------------------------
  // ✅ 1. Modernes Seiten-Header-Label
  // ----------------------------------------------------------
  pdf.setFillColor(...titleColor);
  pdf.rect(marginLeft, marginTop - 10, 170, 8, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.setTextColor(255, 255, 255);
  pdf.text("Firmeninformationen", marginLeft + 3, marginTop - 4);

  // ----------------------------------------------------------
  // ✅ 2. Untertitel / Lead‑Text (modern, grauer Ton)
  // ----------------------------------------------------------
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10.5);
  pdf.setTextColor(...grayText);
  pdf.text(
    "Übersicht der relevanten Firmen- und Kontaktangaben.",
    marginLeft,
    marginTop + 8
  );

  // Spacing zur Tabelle
  let startY = marginTop + 16;

  // ----------------------------------------------------------
  // ✅ 3. Moderne Tabelle (mit cleanem UI, leichter Schattierung)
  // ----------------------------------------------------------
  autoTable(pdf, {
    startY: startY,
    head: [["Angabe", "Wert"]],
    body: [
      ["Firmenname", data.company || "—"],
      ["UID", data.uid || "—"],
      ["Handelsregister (Ja/Nein)", data.hrRegister || "—"],
      ["Strasse / Nr", data.street || "—"],
      ["PLZ / Ort", `${data.postcode || ""} ${data.city || ""}` || "—"],
      ["Postfach", data.poBox || "—"],
      ["PLZ/Ort (Postfach)", data.poPostcode || "—"],
      ["Kontaktperson", data.contactName || "—"],
      ["Telefon", data.contactPhone || "—"],
      ["E-Mail", data.contactEmail || "—"],
    ],

    styles: {
      font: "helvetica",
      fontSize: 10.5,
      cellPadding: 4.5,
      textColor: grayText,
      lineWidth: 0.2,
      lineColor: grayBorder
    },

    headStyles: {
      fillColor: grayLight,
      textColor: [40, 40, 40],
      fontStyle: "bold",
      lineWidth: 0
    },

    alternateRowStyles: {
      fillColor: [250, 250, 250]
    },

    margin: { left: marginLeft, right: marginLeft },
    tableWidth: 170,
  });

  // ----------------------------------------------------------
  // ✅ 4. Optional: dezente Section‑Trennlinie (modern)
  // ----------------------------------------------------------
  let nextY = pdf.lastAutoTable.finalY + 12;
  pdf.setDrawColor(...grayBorder);
  pdf.setLineWidth(0.4);
  pdf.line(marginLeft, nextY, marginLeft + 170, nextY);

  // Bereit für weitere Abschnitte
}
  drawCompanyPage(pdf, data);
  pdf.addPage();
  
  // ----------------------------------------------------------
// ✅ Seite 3 – Inhaltsverzeichnis (neutral & funktionsfähig)
// ----------------------------------------------------------
function drawTableOfContents(pdf) {

  // Titel "Inhalt"
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(0,0,0);
  pdf.text("Inhalt", 20, 20);

  // Position Start
  let y = 40;

  // Liste aller Kapitel (Beispiele – DU bestimmst diese!)
  const toc = [
    { title: "1  Digital Trust Platform – Überblick", page: "4" },
    { title: "2  SIGNING", page: "5" },
    { title: "   2.1  EES – Einfache Signatur", page: "5" },
    { title: "   2.2  FES – Fortgeschrittene Signatur", page: "5" },
    { title: "   2.3  QES – Qualifizierte Signatur", page: "5" },
    { title: "   2.4  Identifikation / seal.ID", page: "5" },
    { title: "3  Setup Gebühren", page: "6" },
    { title: "4  Verschwiegenheitsklausel", page: "6" },
    { title: "5  Gültigkeit des Angebots", page: "6" },
  ];

  // Rendering der Liste
  toc.forEach(row => {
    // Kapiteltext
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(row.title, 20, y);

    // Dotted Line
    drawDottedLine(pdf, 20, y, 150);

    // Seitenzahl rechtsbündig
    pdf.text(row.page, 190, y, { align: "right" });

    y += 10; // spacing
  });
}
  drawTableOfContents(pdf);
  pdf.addPage();

 // ----------------------------------------------------------
// ✅ Seite 4 – "Digital Trust Platform" (neutral)
// ----------------------------------------------------------
function drawDTPPage(pdf) {
  const purpleDark = [23, 4, 86];
  const purpleLight = [140, 70, 200];
  const grayText = [60, 60, 60];

  // ----------------------------------------------------------
  // ✅ SEITEN-ÜBERSCHRIFT
  // ----------------------------------------------------------
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(...purpleDark);
  pdf.text("1. Digital Trust Platform – Überblick", 20, 20);

  // ----------------------------------------------------------
  // ✅ EINLEITENDER ABSATZ (neutraler Beispieltext)
  //    → DU ersetzt ihn später durch deinen echten Abschnitt
  // ----------------------------------------------------------
  const paragraph = 
    "Dies ist ein neutraler Platzhaltertext für die Beschreibung " +
    "einer digitalen Vertrauensplattform. Du kannst hier jede Beschreibung " +
    "einfügen, die du für dein Offerte-Dokument benötigst. Dieser Absatz " +
    "soll lediglich demonstrieren, wie Fließtext auf Seite 4 dargestellt wird. ";

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(...grayText);

  pdf.text(paragraph, 20, 35, { maxWidth: 170, lineHeightFactor: 1.4 });

  // ----------------------------------------------------------
  // ✅ BULLET-POINT LISTE (neutral)
  // ----------------------------------------------------------
  const bulletPoints = [
    "Modulbereich A – Beispielinhalt.",
    "Modulbereich B – Beispielinhalt.",
    "Modulbereich C – Beispielinhalt."
  ];

  let bulletY = 70;

  bulletPoints.forEach(point => {
    pdf.circle(25, bulletY - 2, 1.5, "F");   // Bullet-Kreis
    pdf.text(point, 30, bulletY);
    bulletY += 8;
  });

 // ----------------------------------------------------------
  // ✅ 4-SPALTEN-MODULGRAFIK (neutral)
  // ----------------------------------------------------------
  const columns = [
    { title: "MODUL A", fields: ["Funktion 1", "Funktion 2", "Funktion 3"] },
    { title: "MODUL B", fields: ["Funktion 1", "Funktion 2"] },
    { title: "MODUL C", fields: ["Funktion 1"] },
    { title: "MODUL D", fields: ["Funktion 1", "Funktion 2"] }
  ];

  const colWidth = 40;
  const colStartX = 20;
  const colStartY = 105;

  columns.forEach((col, index) => {
    const x = colStartX + index * (colWidth + 6);

    // Titelbox
    pdf.setFillColor(...purpleDark);
    pdf.rect(x, colStartY, colWidth, 12, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text(col.title, x + 3, colStartY + 8);

    // Felder
    col.fields.forEach((field, fIndex) => {
      const y = colStartY + 15 + fIndex * 12;
      pdf.setFillColor(...purpleLight);
      pdf.rect(x, y, colWidth, 10, "F");

      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(255, 255, 255);
      pdf.text(field, x + 3, y + 7);
    });
  });
}
  drawDTPPage(pdf);
  pdf.addPage();
  
 // ----------------------------------------------------------
// ✅ Seite 5 – SIGNING (neutraler Aufbau)
// ----------------------------------------------------------
function drawSigningPage(pdf, data) {

  const grayLight = [240, 240, 240];
  const textColor = [0, 0, 0];

  // ---------------------------------------
  // ✅ Kapitelüberschrift
  // ---------------------------------------
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(...textColor);
  pdf.text("2. SIGNING", 20, 20);

  // ---------------------------------------
  // ✅ Einleitungstext (neutral)
  // ---------------------------------------
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  
  const introText =
    "Dieser Abschnitt beschreibt die verschiedenen elektronischen Signaturstufen " +
    "(EES, FES, QES) und ergänzt diese um ein neutrales Preisbeispiel. " +
    "Diese Texte kannst du frei durch deine eigenen Inhalte ersetzen.";

  pdf.text(introText, 20, 32, { maxWidth: 170, lineHeightFactor: 1.4 });


  // ---------------------------------------
  // ✅ EES – Tabelle
  // ---------------------------------------
  autoTable(pdf, {
    startY: 55,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [
      ["Einfache elektronische Signatur (EES)", data.ees || "0.80"]
    ],
    headStyles: { fillColor: grayLight },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 }
  });

  // ---------------------------------------
  // ✅ FES – Tabelle
  // ---------------------------------------
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 10,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [
      ["Fortgeschrittene elektronische Signatur (FES)", data.fes || "1.50"]
    ],
    headStyles: { fillColor: grayLight },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 }
  });

  // ---------------------------------------
  // ✅ QES – Tabelle
  // ---------------------------------------
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 10,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [
      ["Qualifizierte elektronische Signatur (QES)", data.qes || "2.20"]
    ],
    headStyles: { fillColor: grayLight },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 }
  });


  // ---------------------------------------
  // ✅ Staffelpreise – seal.ID (neutral)
  // ---------------------------------------
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 15,
    head: [["Volumen pro Jahr", "Preis (CHF)"]],
    body: [
      ["0 – 2’500", data.sealIdPrice || "28.20"],
      ["2’501 – 5’000", "26.20"],
      ["5’001 – 10’000", "24.20"],
      ["> 10’000", "Nach Vereinbarung"]
    ],
    headStyles: { fillColor: grayLight },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 }
  });
}
  drawSigningPage(pdf, data);
  pdf.addPage();

 // ----------------------------------------------------------
// ✅ Seite 6 – Setup, Verschwiegenheit, Gültigkeit (neutral)
// ----------------------------------------------------------
function drawFinalPage(pdf, data) {

  const grayLight = [240, 240, 240];
  const textColor = [0, 0, 0];

  // -------------------------------
  // ✅ 1. Kapitel: Setup-Gebühren
  // -------------------------------
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(...textColor);
  pdf.text("3. Setup Gebühren", 20, 20);

  autoTable(pdf, {
    startY: 30,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [
      ["Setup Fee (einmalig)", "5500.00"],
      ["Ongoing Fee (jährlich)", "2500.00"],
      ["SIGN pro Benutzer/Monat", (data.signUsers || 0) * 9],
      ["White Labeling", data.whiteLabeling ? "2500.00" : "—"],
    ],
    headStyles: { fillColor: grayLight },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 }
  });

  let nextY = pdf.lastAutoTable.finalY + 20;

  // ----------------------------------------------
  // ✅ 2. Kapitel: Verschwiegenheitsklausel (neutral)
  // ----------------------------------------------
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("4. Verschwiegenheitsklausel", 20, nextY);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  const confidentialityText =
    "Dies ist ein neutraler Beispielabsatz für eine Verschwiegenheitsklausel. " +
    "An dieser Stelle kannst du deine eigenen rechtlichen Hinweise oder " +
    "vertraulichen Bestimmungen einfügen.";

  pdf.text(confidentialityText, 20, nextY + 12, {
    maxWidth: 170,
    lineHeightFactor: 1.4
  });

  // ----------------------------------------------
  // ✅ 3. Kapitel: Gültigkeit des Angebots
  // ----------------------------------------------
  nextY += 45;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("5. Gültigkeit des Angebots", 20, nextY);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  const validityText = `Dieses Angebot ist gültig bis: ${data.validUntil || ""}`;

  pdf.text(validityText, 20, nextY + 12);

  // ----------------------------------------------
  // ✅ Footer (neutral)
  // ----------------------------------------------
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(120,120,120);

  pdf.text("Offerte – Digital Trust Platform", 20, 285);
  pdf.text("intrum AG", 190, 285, { align: "right" });
}

  drawFinalPage(pdf, data);
  pdf.addPage();

  // ------------------------------------------
  // ✅ EXPORT
  // ------------------------------------------
  pdf.save(`Offerte_${data.company || "Angebot"}.pdf`);
}
