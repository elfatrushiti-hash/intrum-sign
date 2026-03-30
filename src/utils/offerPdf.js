// offerPdf.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ✅ Roboto-Font als Base64 (Light, Regular, Bold)
import robotoNormal from "./fonts/roboto-normal.js";
import robotoBold from "./fonts/roboto-bold.js";

export function exportOfferPDF(data) {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  // ----------------------------------------------
  // ✅ FONT REGISTRIEREN (Roboto)
  // ----------------------------------------------
  pdf.addFileToVFS("Roboto-Regular.ttf", robotoNormal);
  pdf.addFileToVFS("Roboto-Bold.ttf", robotoBold);
  pdf.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  pdf.addFont("Roboto-Bold.ttf", "RobotoBold", "normal");
  pdf.setFont("Roboto");

  // -------------------------
  // ✅ TITELSEITE (Vektor)
  // -------------------------
  pdf.setFillColor(23, 4, 86);
  pdf.rect(0, 0, 210, 40, "F");

  pdf.setFont("RobotoBold");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(26);
  pdf.text("Offerte – Digital Onboarding", 20, 25);

  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.setFont("Roboto");
  pdf.text("Ausgearbeitet von Intrum AG", 20, 55);
  pdf.text("für:", 20, 65);

  pdf.setFont("RobotoBold");
  pdf.text(data.company || "", 20, 75);

  // -------------------------
  // ✅ Kundendaten (Tabelle)
  // -------------------------
  pdf.setFont("Roboto");
  pdf.setFontSize(11);
  autoTable(pdf, {
    startY: 90,
    head: [["Kategorie", "Wert"]],
    body: [
      ["Firmenname", data.company],
      ["UID", data.uid],
      ["HR-Eintrag", data.hrRegister],
      ["Strasse / Nr", data.street],
      ["PLZ / Ort", `${data.postcode} ${data.city}`],
      ["Postfach", data.poBox],
      ["PLZ / Ort (Postfach)", data.poPostcode],
      ["Kontaktperson", data.contactName],
      ["Funktion/Abteilung", data.contactRole],
      ["Telefon", data.contactPhone],
      ["E-Mail", data.contactEmail],
    ],
    styles: { font: "Roboto", fontSize: 10 },
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
  });

  pdf.addPage();

  // -------------------------
  // ✅ Ansprechpartner Intrum
  // -------------------------
  pdf.setFont("RobotoBold");
  pdf.setFontSize(14);
  pdf.setTextColor(23, 4, 86);
  pdf.text("Ihre Ansprechperson bei Intrum", 20, 20);

  pdf.setFont("Roboto");
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(11);

  autoTable(pdf, {
    startY: 30,
    head: [["Kategorie", "Angaben"]],
    body: [
      ["Name", data.intrumName],
      ["E-Mail", data.intrumEmail],
      ["Telefon", data.intrumPhone],
      ["Adresse", "Intrum AG, Eschenstrasse 12, 8603 Schwerzenbach"],
    ],
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
    styles: { font: "Roboto", fontSize: 10 },
  });

  // -------------------------
  // ✅ Kapitel 1: Digital Trust Platform (aus PDF)
  // -------------------------
  pdf.addPage();
  pdf.setFont("RobotoBold");
  pdf.setFontSize(14);
  pdf.text("1. Digital Trust Platform – Die Grundlage", 20, 20);

  pdf.setFont("Roboto");
  pdf.setFontSize(10);

  const dtpText =
    "Die Digital Trust Platform (DTP) verbindet alle zentralen Elemente ..."; // gekürzt

  pdf.text(dtpText, 20, 30, { maxWidth: 170, lineHeightFactor: 1.4 });

  // -------------------------
  // ✅ Kapitel 2 & 3: SIGNING Tabellen (EES / FES / QES)
  // -------------------------
  pdf.addPage();
  pdf.setFont("RobotoBold");
  pdf.setFontSize(14);
  pdf.text("2. SIGNING", 20, 20);

  // — EES
  autoTable(pdf, {
    startY: 30,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [["EES – Einfache elektronische Signatur", data.ees.toFixed(2)]],
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
    styles: { font: "Roboto", fontSize: 10 },
  });

  // — FES
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 10,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [["FES – Fortgeschrittene elektronische Signatur", data.fes.toFixed(2)]],
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
    styles: { font: "Roboto", fontSize: 10 },
  });

  // — QES
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 10,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [["QES – Qualifizierte elektronische Signatur", data.qes.toFixed(2)]],
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
    styles: { font: "Roboto", fontSize: 10 },
  });

  // -------------------------
  // ✅ seal.ID
  // -------------------------
  let sealPrice =
    data.sealIdPrice === "Nach Vereinbarung"
      ? "Nach Vereinbarung"
      : `${data.sealIdPrice} CHF`;

  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 15,
    head: [["Volumen pro Jahr", "Preis (CHF)"]],
    body: [[data.sealIdVolume, sealPrice]],
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
    styles: { font: "Roboto", fontSize: 10 },
  });

  // -------------------------
  // ✅ Setup Gebühren
  // -------------------------
  pdf.addPage();
  pdf.setFont("RobotoBold");
  pdf.setFontSize(14);
  pdf.setTextColor(23, 4, 86);
  pdf.text("4. Setup Gebühren", 20, 20);

  autoTable(pdf, {
    startY: 30,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [
      ["Setup fee (einmalig)", "5'500.00"],
      ["Ongoing fee (jährlich)", "2'500.00"],
      ["SIGN (pro User/Monat)", `${data.signUsers * 9}.00`],
      [
        "White Labeling (optional)",
        data.whiteLabeling ? "2'500.00" : "—",
      ],
    ],
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
    styles: { font: "Roboto", fontSize: 10 },
  });

  // -------------------------
  // ✅ Verschwiegenheit
  // -------------------------
  pdf.addPage();
  pdf.setFont("RobotoBold");
  pdf.setFontSize(14);
  pdf.text("5. Verschwiegenheitsklausel", 20, 20);

  const secretText =
    "Konditionen sowie sämtliche Details, insbesondere Preise, sind vertraulich ..."; // gekürzt
  pdf.setFont("Roboto");
  pdf.setFontSize(10);
  pdf.text(secretText, 20, 30, { maxWidth: 170, lineHeightFactor: 1.4 });

  // -------------------------
  // ✅ Gültigkeit
  // -------------------------
  pdf.setFont("RobotoBold");
  pdf.setFontSize(14);
  pdf.text("6. Gültigkeit des Angebots", 20, 80);

  pdf.setFont("Roboto");
  pdf.setFontSize(10);
  pdf.text(
    `Dieses Angebot ist gültig bis ${data.validUntil}.`,
    20,
    90
  );

  // FOOTER
  pdf.setFontSize(9);
  pdf.text("Offerte – Digital Trust Platform – Intrum AG", 20, 280);

  // SAVE
  pdf.save(`Offerte_${data.company}.pdf`);
}
``