import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOfferPDF(data) {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  const colors = {
    darkViolet: [60, 20, 140], // alle ehemals blauen Elemente jetzt Intrum-Violett
    intrumViolet: [60, 20, 140],
    textDark: [0, 0, 0],
    textLight: [255, 255, 255],
    cardBg: [245, 245, 250],
    border: [220, 220, 230],
    grayBox: [240, 240, 240],
  };

  // ---------------------------------------
  // HEADER + FOOTER
  // ---------------------------------------
  function drawHeaderFooter(page) {
    pdf.setFillColor(...colors.intrumViolet);
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

  // ---------------------------------------
  // COVER PAGE
  // ---------------------------------------
  function drawCover() {
    const steps = 100;
    for (let i = 0; i < steps; i++) {
      const r = colors.darkViolet[0];
      const g = colors.darkViolet[1];
      const b = colors.darkViolet[2];
      pdf.setFillColor(r, g, b);
      pdf.rect(0, i * (297 / steps), 210, 297 / steps, "F");
    }

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

  // ---------------------------------------
  // SEITE 2 – UNTERNEHMENSDATEN
  // ---------------------------------------
  function drawCompanyPage() {
    drawHeaderFooter(2);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(...colors.intrumViolet);
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
      headStyles: { fillColor: colors.cardBg, textColor: colors.textDark, fontStyle: "bold" },
      styles: { fontSize: 10, textColor: colors.textDark, lineColor: colors.border },
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
      headStyles: { fillColor: colors.cardBg, textColor: colors.textDark, fontStyle: "bold" },
      styles: { fontSize: 10, textColor: colors.textDark, lineColor: colors.border },
      margin: { left: 20, right: 20 },
    });
  }

  // ---------------------------------------
  // SEITE 3 – INHALTSVERZEICHNIS
  // ---------------------------------------
  function drawTableOfContents() {
    drawHeaderFooter(3);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(...colors.textDark);
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
      pdf.setFontSize(10);
      pdf.text(row.title, 20, y);

      const textWidth = pdf.getTextWidth(row.title);
      const startX = 20 + textWidth + 2;
      const endX = 180; // Abstand zur Seitenzahl
      const dotCount = Math.floor((endX - startX) / pdf.getTextWidth("."));
      const dots = ".".repeat(dotCount);
      pdf.text(dots, startX, y);
      pdf.text(String(row.page), 190, y, { align: "right" });
      y += 8;
    });
  }

  // ---------------------------------------
  // SEITE 4 – DTP + KACHELN
  // ---------------------------------------
  function drawDTPPage() {
    drawHeaderFooter(4);

    const marginLeft = 20;
    const marginRight = 20;
    const pageWidth = 210;
    const maxTextWidth = pageWidth - marginLeft - marginRight;

    let y = 20;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    const title =
      "1\tDigital Trust Platform – Die Grundlage für sichere und effiziente digitale Geschäftsprozesse";
    const titleLines = pdf.splitTextToSize(title, maxTextWidth);
    pdf.setTextColor(...colors.textDark);
    pdf.text(titleLines, marginLeft, y);
    y += titleLines.length * 6 + 4;

    pdf.setFont("helvetica", "normal");
    const paragraph =
      "Die Digital Trust Platform (DTP) verbindet alle zentralen Elemente für ein durchgängig digitales und vertrauenswürdiges Onboarding in einer modular aufgebauten Lösung: von der Identifikation über Bonitäts- und Fraud-Prüfungen bis hin zur elektronischen Signatur – sicher, rechtskonform und effizient. Die Plattform wurde speziell dafür entwickelt, Unternehmen bei der Digitalisierung kritischer Prozesse zu unterstützen, ohne dabei Kompromisse bei Sicherheit, Nutzerfreundlichkeit oder regulatorischer Konformität einzugehen. Sie lässt sich flexibel in bestehende Systemlandschaften integrieren und ermöglicht so individuelle Customer Journeys mit hohem Automatisierungsgrad.";
    const paraLines = pdf.splitTextToSize(paragraph, maxTextWidth);
    pdf.text(paraLines, marginLeft, y);
    y += paraLines.length * 6 + 4;

    pdf.setFont("helvetica", "bold");
    pdf.text("Kernmodule der DTP sind:", marginLeft, y);
    y += 6;

    const bullets = [
      {
        title: "Identification",
        text: "Verschiedene Verfahren wie AutoIdent, VideoIdent oder vor-Ort-Identifikation, je nach regulatorischen Anforderungen.",
      },
      {
        title: "Smart Data",
        text: "Intelligente Prüfungen wie Bonitätsbewertung (AI Credit Scores), Adressverifikation, Fraud Check und Compliance Screening – nahtlos eingebunden in den Onboarding-Prozess.",
      },
      {
        title: "Signing",
        text: "Elektronische Signatur mit Unterstützung aller drei Signaturstufen (EES, FES, QES), rechtssicher und benutzerfreundlich.",
      },
    ];

    bullets.forEach((b) => {
      pdf.setFont("helvetica", "bold");
      pdf.text(`• ${b.title}:`, marginLeft, y);
      pdf.setFont("helvetica", "normal");
      const lines = pdf.splitTextToSize(b.text, maxTextWidth - 25);
      pdf.text(lines, marginLeft + 25, y);
      y += lines.length * 6 + 2;
    });

    y += 5;

    const kacheln = [
      { title: "Kunde", boxes: ["Self-Onboarding", "CRM", "Interne Applikation", "Externe Applikation"] },
      { title: "IDENTIFICATION", boxes: ["AutoIdent", "VideoIdent", "OnlineIdent", "QES-Ident (seal.ID)", "BankIdent (ab 2026)"] },
      { title: "SMART DATA", boxes: ["Credit Scores", "Data Reports", "Address", "Fraud", "Compliance", "ZEK/IKO/KREMO"] },
      { title: "SIGNING", boxes: ["EES", "FES", "QES", "SIGN"] },
    ];

    const kWidth = 40;
    const kSpacing = 10;
    const startX = marginLeft;
    let kY = y;

    kacheln.forEach((k, i) => {
      const x = startX + i * (kWidth + kSpacing);

      // Hintergrund jeder Kachel separat
      pdf.setFillColor(...colors.grayBox);
      const totalHeight = 12 + k.boxes.length * 12;
      pdf.rect(x, kY, kWidth, totalHeight, "F");

      // Titel
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(...colors.textDark);
      pdf.text(k.title, x + 2, kY + 7);

      // Kästchen
      k.boxes.forEach((b, j) => {
        const yBox = kY + 12 + j * 12;
        pdf.setFillColor(...colors.intrumViolet);
        pdf.rect(x, yBox, kWidth, 10, "F");
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(...colors.textLight);
        pdf.text(b, x + 2, yBox + 7);
      });
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
