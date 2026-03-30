// offerPdf.js (Helvetica Version – no external fonts required)

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOfferPDF(data) {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  // ----------------------------------------------------
  // ✅ TITELSEITE (Intrum Purple Vektorheader)
  // ----------------------------------------------------
  pdf.setFillColor(23, 4, 86); // Intrum Purple
  pdf.rect(0, 0, 210, 40, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(26);
  pdf.text("Offerte – Digital Onboarding", 20, 25);

  pdf.setTextColor(0, 0, 0);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.text("Ausgearbeitet von Intrum AG", 20, 55);

  pdf.setFont("helvetica", "bold");
  pdf.text("für:", 20, 65);
  pdf.text(data.company || "", 20, 75);

  // ----------------------------------------------------
  // ✅ Kundendaten-Tabelle (1:1 nach extrahierter PDF)
  // ----------------------------------------------------
  pdf.setFont("helvetica", "normal");
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
    styles: { font: "helvetica", fontSize: 10 },
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
    margin: { left: 20, right: 20 },
  });

  // ----------------------------------------------------
  // ✅ Seite 2: Ansprechpartner Intrum
  // ----------------------------------------------------
  pdf.addPage();
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(23, 4, 86);
  pdf.text("Ihre Ansprechperson bei Intrum", 20, 20);

  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(0, 0, 0);

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
    styles: { font: "helvetica", fontSize: 10 },
    margin: { left: 20, right: 20 },
  });

  // ----------------------------------------------------
  // ✅ Seite 3: Kapitel 1 – Digital Trust Platform
  // ----------------------------------------------------
  pdf.addPage();
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("1. Digital Trust Platform – Die Grundlage", 20, 20);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  const text1 =
    "Die Digital Trust Platform (DTP) verbindet alle zentralen Elemente für ein durchgängig digitales und " +
    "vertrauenswürdiges Onboarding in einer modular aufgebauten Lösung. Sie wurde speziell dafür entwickelt, " +
    "Unternehmen bei der Digitalisierung kritischer Prozesse zu unterstützen – ohne Kompromisse bei Sicherheit, " +
    "Nutzerfreundlichkeit oder regulatorischer Konformität. Kernmodule der DTP sind Identification, Smart Data " +
    "sowie Signing. Sie ermöglicht individuelle Customer Journeys mit hohem Automatisierungsgrad.";

  pdf.text(text1, 20, 30, { maxWidth: 170, lineHeightFactor: 1.5 });

  // ----------------------------------------------------
  // ✅ Seite 4: SIGNING (EES / FES / QES / seal.ID)
  // ----------------------------------------------------
  pdf.addPage();
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("2. SIGNING", 20, 20);

  // EES
  autoTable(pdf, {
    startY: 30,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [["EES – Einfache elektronische Signatur", data.ees.toFixed(2)]],
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
    styles: { font: "helvetica", fontSize: 10 },
    margin: { left: 20, right: 20 },
  });

  // FES
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 10,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [["FES – Fortgeschrittene elektronische Signatur", data.fes.toFixed(2)]],
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
    styles: { font: "helvetica", fontSize: 10 },
    margin: { left: 20, right: 20 },
  });

  // QES
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 10,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [["QES – Qualifizierte elektronische Signatur", data.qes.toFixed(2)]],
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
    styles: { font: "helvetica", fontSize: 10 },
    margin: { left: 20, right: 20 },
  });

  // seal.ID
  let sealPrice =
    data.sealIdPrice === "Nach Vereinbarung"
      ? "Nach Vereinbarung"
      : `${data.sealIdPrice} CHF`;

  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 10,
    head: [["Volumen pro Jahr", "Preis (CHF)"]],
    body: [[data.sealIdVolume, sealPrice]],
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
    styles: { font: "helvetica", fontSize: 10 },
    margin: { left: 20, right: 20 },
  });

  // ----------------------------------------------------
  // ✅ Seite 5: Setup Gebühren (exakt laut PDF)
  // ----------------------------------------------------
  pdf.addPage();
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("3. Setup Gebühren", 20, 20);

  autoTable(pdf, {
    startY: 30,
    head: [["Beschreibung", "Preis (CHF)"]],
    body: [
      ["Setup fee (einmalig)", "5'500.00"],
      ["Ongoing fee (jährlich)", "2'500.00"],
      ["SIGN (pro User & Monat)", `${(data.signUsers || 0) * 9}.00`],
      [
        "White Labeling (optional)",
        data.whiteLabeling ? "2'500.00" : "—",
      ],
    ],
    styles: { font: "helvetica", fontSize: 10 },
    headStyles: { fillColor: [23, 4, 86], textColor: 255 },
    margin: { left: 20, right: 20 },
  });

  // ----------------------------------------------------
  // ✅ Seite 6: Verschwiegenheit + Gültigkeit
  // ----------------------------------------------------
  pdf.addPage();

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("4. Verschwiegenheitsklausel", 20, 20);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(
    "Konditionen sowie sämtliche Details, insbesondere Preise, sind strikt vertraulich zu behandeln " +
      "und insbesondere nicht an Dritte zu kommunizieren.",
    20,
    30,
    { maxWidth: 170, lineHeightFactor: 1.5 }
  );

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("5. Gültigkeit des Angebots", 20, 70);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(
    `Dieses Angebot ist gültig bis ${data.validUntil}.`,
    20,
    80
  );

  // FOOTER
  pdf.setFontSize(9);
  pdf.text("Offerte – Digital Trust Platform – Intrum AG", 20, 280);

  // SAVE
  pdf.save(`Offerte_${data.company || "Kunde"}.pdf`);
}
