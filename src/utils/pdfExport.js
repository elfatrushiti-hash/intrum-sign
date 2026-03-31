import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOfferPDF(data) {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  const colors = {
    intrumPurple: [127, 61, 167],
    intrumPurpleSoft: [236, 226, 241],
    textDark: [0, 0, 0],
    textLight: [255, 255, 255],
    border: [220, 220, 230],
    grayBox: [240, 240, 240],
  };

  function drawHeaderFooter(page) {
    pdf.setFillColor(...colors.intrumPurple);
    pdf.rect(0, 0, 210, 6, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(...colors.textLight);
    pdf.text("INTRUM", 190, 12, { align: "right" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(120, 120, 120);
    pdf.text("Offerte – Digital Trust Platform", 20, 287);
    pdf.text(`Seite ${page}`, 190, 287, { align: "right" });
  }

  function drawCover() {
    pdf.setFillColor(...colors.intrumPurple);
    pdf.rect(0, 0, 210, 297, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(28);
    pdf.setTextColor(...colors.textLight);
    pdf.text("Offerte", 20, 80);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(16);
    pdf.text("Digital Trust Platform", 20, 95);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(32);
    pdf.text("INTRUM", 105, 260, { align: "center" });
  }

  function drawCompanyPage() {
    drawHeaderFooter(2);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(...colors.intrumPurple);
    pdf.text("Offerte", 20, 30);

    let y = 55;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(...colors.textDark);
    pdf.text("Ausgearbeitet von", 20, y);

    y += 10;
    pdf.setFont("helvetica", "bold");
    pdf.text("Intrum AG, Eschenstrasse 12, 8603 Schwerzenbach", 20, y);

    y += 6;
    pdf.setFont("helvetica", "normal");
    pdf.text("(nachfolgend Intrum genannt)", 20, y);

    y += 10;
    pdf.text("für", 20, y);

    y += 10;
    pdf.setFont("helvetica", "bold");
    pdf.text("Firma (nachfolgend Partner genannt)", 20, y);

    autoTable(pdf, {
      startY: y + 8,
      head: [["Angabe", "Details"]],
      body: [
        ["Firmenname", data.company || "—"],
        ["UID", data.uid || "—"],
        ["Handelsregister", data.hrRegister || "—"],
        ["Adresse", data.street || "—"],
        ["PLZ / Ort", `${data.postcode || ""} ${data.city || ""}`],
      ],
      headStyles: { fillColor: colors.intrumPurpleSoft },
      styles: { fontSize: 10 },
      margin: { left: 20, right: 20 },
    });

    autoTable(pdf, {
      startY: pdf.lastAutoTable.finalY + 15,
      head: [["Ansprechperson", "Details"]],
      body: [
        ["Name", data.contactName || "—"],
        ["Telefon", data.contactPhone || "—"],
        ["E-Mail", data.contactEmail || "—"],
      ],
      headStyles: { fillColor: colors.intrumPurpleSoft },
      styles: { fontSize: 10 },
      margin: { left: 20, right: 20 },
    });
  }

  function drawTableOfContents() {
    drawHeaderFooter(3);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("Inhalt", 20, 20);

    let y = 40;
    const toc = [
      { title: "1  Digital Trust Platform – Überblick", page: 4 },
      { title: "2  SIGNING", page: 5 },
      { title: "2.1  EES – Einfache Signatur", page: 5 },
      { title: "2.2  FES – Fortgeschrittene Signatur", page: 5 },
      { title: "2.3  QES – Qualifizierte Signatur", page: 5 },
      { title: "2.4  Identifikation / seal.ID", page: 5 },
      { title: "3  Setup Gebühren", page: 6 },
      { title: "4  Verschwiegenheitsklausel", page: 6 },
      { title: "5  Gültigkeit des Angebots", page: 6 },
    ];

    toc.forEach((row) => {
      pdf.setFont("helvetica", "normal");
      pdf.text(row.title, 20, y);

      const textWidth = pdf.getTextWidth(row.title);
      const startX = 20 + textWidth + 2;
      const endX = 180;
      const dotCount = Math.floor((endX - startX) / pdf.getTextWidth("."));
      pdf.text(".".repeat(dotCount), startX, y);
      pdf.text(String(row.page), 190, y, { align: "right" });

      y += 8;
    });
  }

  function drawDTPPage() {
    drawHeaderFooter(4);

    const marginLeft = 20;
    const marginRight = 190;
    const maxTextWidth = marginRight - marginLeft;

    let y = 20;

    // Titel
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    const title =
      "1 Digital Trust Platform – Die Grundlage für sichere und effiziente digitale Geschäftsprozesse";

    const titleLines = pdf.splitTextToSize(title, maxTextWidth);
    pdf.text(titleLines, marginLeft, y);
    y += titleLines.length * 7 + 2;

    // Text
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    const paragraph =
      "Die Digital Trust Platform (DTP) verbindet alle zentralen Elemente für ein durchgängig digitales und vertrauenswürdiges Onboarding in einer modular aufgebauten Lösung: von der Identifikation über Bonitäts- und Fraud-Prüfungen bis hin zur elektronischen Signatur – sicher, rechtskonform und effizient. Die Plattform wurde speziell dafür entwickelt, Unternehmen bei der Digitalisierung kritischer Prozesse zu unterstützen, ohne dabei Kompromisse bei Sicherheit, Nutzerfreundlichkeit oder regulatorischer Konformität einzugehen. Sie lässt sich flexibel in bestehende Systemlandschaften integrieren und ermöglicht so individuelle Customer Journeys mit hohem Automatisierungsgrad.";

    const textLines = pdf.splitTextToSize(paragraph, maxTextWidth);
    pdf.text(textLines, marginLeft, y);
    y += textLines.length * 6 + 4;

    // Kernmodule
    pdf.setFont("helvetica", "bold");
    pdf.text("Kernmodule der DTP sind:", marginLeft, y);
    y += 6;

    const bullets = [
      {
        title: "Identification",
        text:
          "Verschiedene Verfahren wie AutoIdent, VideoIdent oder vor-Ort-Identifikation, je nach regulatorischen Anforderungen.",
      },
      {
        title: "Smart Data",
        text:
          "Intelligente Prüfungen wie Bonitätsbewertung (AI Credit Scores), Adressverifikation, Fraud Check und Compliance Screening – nahtlos eingebunden in den Onboarding-Prozess.",
      },
      {
        title: "Signing",
        text:
          "Elektronische Signatur mit Unterstützung aller drei Signaturstufen (EES, FES, QES), rechtssicher und benutzerfreundlich.",
      },
    ];

    bullets.forEach((b) => {
      pdf.setFont("helvetica", "bold");
      const label = `• ${b.title}:`;
      pdf.text(label, marginLeft, y);

      const textX = marginLeft + pdf.getTextWidth(label) + 2;

      pdf.setFont("helvetica", "normal");
      const lines = pdf.splitTextToSize(
        b.text,
        marginRight - textX
      );
      pdf.text(lines, textX, y);

      y += lines.length * 6 + 2;
    });

    y += 5;

    // Kacheln
    const kacheln = [
      { title: "Kunde", boxes: ["Self-Onboarding", "CRM", "Interne Applikation", "Externe Applikation"] },
      { title: "IDENTIFICATION", boxes: ["AutoIdent", "VideoIdent", "OnlineIdent", "QES-Ident (seal.ID)", "BankIdent (ab 2026)"] },
      { title: "SMART DATA", boxes: ["Credit Scores", "Data Reports", "Address", "Fraud", "Compliance", "ZEK/IKO/KREMO"] },
      { title: "SIGNING", boxes: ["EES", "FES", "QES", "SIGN"] },
    ];

    const spacing = 5;
    const widthBox = (marginRight - marginLeft - spacing * 3) / 4;

    kacheln.forEach((k, i) => {
      const x = marginLeft + i * (widthBox + spacing);

      pdf.setFillColor(...colors.grayBox);
      pdf.rect(x, y, widthBox, 12 + k.boxes.length * 10, "F");

      pdf.setFont("helvetica", "bold");
      pdf.text(k.title, x + 2, y + 6);

      k.boxes.forEach((b, j) => {
        const yy = y + 10 + j * 10;

        pdf.setFillColor(...colors.intrumPurple);
        pdf.rect(x + 1, yy, widthBox - 2, 8, "F");

        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(...colors.textLight);
        pdf.setFontSize(9);
        pdf.text(b, x + 2, yy + 5.5);
      });

      pdf.setTextColor(...colors.textDark);
    });
  }

  drawCover();
  pdf.addPage();
  drawCompanyPage();
  pdf.addPage();
  drawTableOfContents();
  pdf.addPage();
  drawDTPPage();

  pdf.save(`Offerte_${data.company || "Angebot"}.pdf`);
}
