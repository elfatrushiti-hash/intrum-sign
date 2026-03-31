import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOfferPDF(data) {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  const colors = {
    darkViolet: [45, 0, 90],
    midViolet: [120, 50, 180],
    lightViolet: [180, 120, 220],
    intrumViolet: [120, 50, 180],
    textDark: [0, 0, 0],
    textLight: [255, 255, 255],
    cardBg: [245, 245, 250],
    border: [220, 220, 230]
  };

  // --------------------------
  // HEADER + FOOTER
  // --------------------------
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

  // --------------------------
  // SEITE 2 – UNTERNEHMENSDATEN
  // --------------------------
  function drawCompanyPage() {
    drawHeaderFooter(2);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(...colors.intrumViolet);
    pdf.text("Offerte", 20, 30);

    let y = 55;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
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

    // Unternehmensdaten
    autoTable(pdf, {
      startY: y + 8,
      head: [["Angabe", "Details"]],
      body: [
        ["Firmenname", data.company || "—"],
        ["UID", data.uid || "—"],
        ["Handelsregister", data.hrRegister || "—"],
        ["Adresse", data.street || "—"],
        ["PLZ / Ort", `${data.postcode || ""} ${data.city || ""}`]
      ],
      headStyles: { fillColor: colors.cardBg, textColor: colors.textDark, fontStyle: "bold" },
      styles: { fontSize: 10.5, textColor: colors.textDark, lineColor: colors.border }
    });

    // Kontaktperson
    autoTable(pdf, {
      startY: pdf.lastAutoTable.finalY + 15,
      head: [["Ansprechperson", "Details"]],
      body: [
        ["Name", data.contactName || "—"],
        ["Telefon", data.contactPhone || "—"],
        ["E-Mail", data.contactEmail || "—"]
      ],
      headStyles: { fillColor: colors.cardBg, textColor: colors.textDark, fontStyle: "bold" },
      styles: { fontSize: 10.5, textColor: colors.textDark, lineColor: colors.border }
    });
  }

  // --------------------------
  // SEITE 3 – INHALTSVERZEICHNIS
  // --------------------------
  function drawTableOfContents() {
    drawHeaderFooter(3);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(...colors.textDark);
    pdf.text("Inhalt", 20, 20);

    let y = 35;
    const toc = [
      { title: "1  Digital Trust Platform – Überblick", page: "4" },
      { title: "2  SIGNING", page: "5" },
      { title: "   2.1  EES – Einfache Signatur", page: "5" },
      { title: "   2.2  FES – Fortgeschrittene Signatur", page: "5" },
      { title: "   2.3  QES – Qualifizierte Signatur", page: "5" },
      { title: "   2.4  Identifikation / seal.ID", page: "5" },
      { title: "3  Setup Gebühren", page: "6" },
      { title: "4  Verschwiegenheitsklausel", page: "6" },
      { title: "5  Gültigkeit des Angebots", page: "6" }
    ];

    toc.forEach(row => {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(row.title, 20, y);

      // Dynamische gepunktete Linie vom Ende des Textes bis kurz vor Seitenzahl
      const textWidth = pdf.getTextWidth(row.title);
      const lineStart = 20 + textWidth + 2;
      const lineEnd = 190 - 4;
      const dotCount = Math.floor((lineEnd - lineStart) / 2);
      const dots = ".".repeat(dotCount);
      pdf.text(dots, lineStart, y);

      pdf.text(row.page, 190, y, { align: "right" });
      y += 10;
    });
  }

  // --------------------------
  // SEITE 4 – DTP + BULLETS + KACHELN
  // --------------------------
  function drawDTPPage() {
    drawHeaderFooter(4);

    const marginLeft = 20;
    const marginRight = 20;
    const pageWidth = 210;
    const maxTextWidth = pageWidth - marginLeft - marginRight;
    let y = 20;

    // Titel
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(...colors.textDark);
    const title = "1        Digital Trust Platform – Die Grundlage für sichere und effiziente digitale Geschäftsprozesse";
    const titleLines = pdf.splitTextToSize(title, maxTextWidth);
    pdf.text(titleLines, marginLeft, y);
    y += titleLines.length * 6 + 4;

    // Einleitung
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    const paragraph =
      "Die Digital Trust Platform (DTP) verbindet alle zentralen Elemente für ein durchgängig digitales und vertrauenswürdiges Onboarding in einer modular aufgebauten Lösung: von der Identifikation über Bonitäts- und Fraud-Prüfungen bis hin zur elektronischen Signatur – sicher, rechtskonform und effizient. " +
      "Die Plattform wurde speziell dafür entwickelt, Unternehmen bei der Digitalisierung kritischer Prozesse zu unterstützen, ohne dabei Kompromisse bei Sicherheit, Nutzerfreundlichkeit oder regulatorischer Konformität einzugehen. Sie lässt sich flexibel in bestehende Systemlandschaften integrieren und ermöglicht so individuelle Customer Journeys mit hohem Automatisierungsgrad.";
    const paraLines = pdf.splitTextToSize(paragraph, maxTextWidth);
    pdf.text(paraLines, marginLeft, y);
    y += paraLines.length * 6 + 6;

    // Kernmodule
    pdf.setFont("helvetica", "bold");
    pdf.text("Kernmodule der DTP sind:", marginLeft, y);
    y += 6;

    const bullets = [
      { title: "Identification", text: "Verschiedene Verfahren wie AutoIdent, VideoIdent oder vor-Ort-Identifikation, je nach regulatorischen Anforderungen." },
      { title: "Smart Data", text: "Intelligente Prüfungen wie Bonitätsbewertung (AI Credit Scores), Adressverifikation, Fraud Check und Compliance Screening – nahtlos eingebunden in den Onboarding-Prozess." },
      { title: "Signing", text: "Elektronische Signatur mit Unterstützung aller drei Signaturstufen (EES, FES, QES), rechtssicher und benutzerfreundlich." }
    ];

    bullets.forEach(b => {
      pdf.setFont("helvetica", "bold");
      pdf.text("• " + b.title + ":", marginLeft, y);

      pdf.setFont("helvetica", "normal");
      const bulletLines = pdf.splitTextToSize(b.text, maxTextWidth - 8);
      pdf.text(bulletLines, marginLeft + 8, y);
      y += bulletLines.length * 6 + 4;
    });

    y += 4;

    // -----------------------------
    // Kacheln (vier vertikale Einheiten)
    // -----------------------------
    const kacheln = [
      { title: "KUNDE", cards: ["Self-Onboarding", "CRM", "Interne Applikation", "Externe Applikation"] },
      { title: "IDENTIFICATION", cards: ["AutoIdent", "VideoIdent", "OnlineIdent", "QES-Ident (seal.ID)", "BankIdent (ab 2026)", "E-ID (ab 2026)"] },
      { title: "SMART DATA", cards: ["Credit Scores", "Data Reports", "Address", "Fraud", "Compliance", "ZEK/IKO/KREMO"] },
      { title: "SIGNING", cards: ["EES", "FES", "QES", "SIGN"] }
    ];

    const colWidth = 40;
    const colSpacing = 10;
    const startX = marginLeft;
    let maxColHeight = 0;

    kacheln.forEach((kachel, idx) => {
      const x = startX + idx * (colWidth + colSpacing);
      let blockY = y;

      // Hintergrund Kachel leicht grau
      const totalHeight = 12 + kachel.cards.length * 12;
      pdf.setFillColor(240, 240, 240);
      pdf.rect(x - 2, blockY - 4, colWidth + 4, totalHeight + 4, "F");

      // Titel
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(...colors.textDark);
      pdf.text(kachel.title, x, blockY);

      // Karten
      blockY += 6;
      kachel.cards.forEach((card, cIdx) => {
        blockY += 10;
        pdf.setFillColor(...colors.intrumViolet);
        pdf.rect(x, blockY, colWidth, 8, "F");

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(...colors.textLight);
        pdf.text(card, x + 2, blockY + 6);
      });

      if (totalHeight > maxColHeight) maxColHeight = totalHeight;
    });
  }

  // --------------------------
  // PDF Erzeugen
  // --------------------------
  drawCompanyPage();
  pdf.addPage();
  drawTableOfContents();
  pdf.addPage();
  drawDTPPage();

  pdf.save(`Offerte_${data.company || "Angebot"}.pdf`);
}
