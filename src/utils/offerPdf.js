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

  // =========================
  // HEADER / FOOTER (ALLE SEITEN)
  // =========================
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

  // =========================
  // SEITE 1 — COVER
  // =========================
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
  // =========================
  // ENDE SEITE 1
  // =========================


  // =========================
  // SEITE 2 — FIRMENDATEN
  // =========================
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
      headStyles: { fillColor: colors.intrumPurpleSoft, textColor: colors.textDark, fontStyle: "bold" },
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
      headStyles: { fillColor: colors.intrumPurpleSoft, textColor: colors.textDark, fontStyle: "bold" },
      styles: { fontSize: 10, textColor: colors.textDark, lineColor: colors.border },
      margin: { left: 20, right: 20 },
    });
  }
  // =========================
  // ENDE SEITE 2
  // =========================


  // =========================
  // SEITE 3 — INHALTSVERZEICHNIS
  // =========================
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
      const endX = 180;
      const dotCount = Math.floor((endX - startX) / pdf.getTextWidth("."));
      pdf.text(".".repeat(dotCount), startX, y);
      pdf.text(String(row.page), 190, y, { align: "right" });

      y += 8;
    });
  }
  // =========================
  // ENDE SEITE 3
  // =========================


  // =========================
  // SEITE 4 — DIGITAL TRUST PLATFORM
  // =========================

function drawDTPPage() {
  drawHeaderFooter(4);

  const marginLeft = 20;
  const marginRight = 20;
  const pageWidth = 210;
  const maxTextWidth = pageWidth - marginLeft - marginRight;
  const pageHeight = 297;
  const marginBottom = 20;

  let y = 20;

  // Titel
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(...colors.textDark);
  const title = "1\tDigital Trust Platform – Die Grundlage für sichere und effiziente digitale Geschäftsprozesse";
  const titleLines = pdf.splitTextToSize(title, maxTextWidth);
  pdf.text(titleLines, marginLeft, y);
  y += titleLines.length * 6 + 4;

  // Einleitender Text
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  const paragraph =
    "Die Digital Trust Platform (DTP) verbindet alle zentralen Elemente für ein durchgängig digitales und vertrauenswürdiges Onboarding in einer modular aufgebauten Lösung: von der Identifikation über Bonitäts- und Fraud-Prüfungen bis hin zur elektronischen Signatur – sicher, rechtskonform und effizient. Die Plattform wurde speziell dafür entwickelt, Unternehmen bei der Digitalisierung kritischer Prozesse zu unterstützen, ohne dabei Kompromisse bei Sicherheit, Nutzerfreundlichkeit oder regulatorischer Konformität einzugehen. Sie lässt sich flexibel in bestehende Systemlandschaften integrieren und ermöglicht so individuelle Customer Journeys mit hohem Automatisierungsgrad.";
  const paraLines = pdf.splitTextToSize(paragraph, maxTextWidth);
  pdf.text(paraLines, marginLeft, y);
  y += paraLines.length * 6 + 6;

  // Kernmodule
  pdf.setFont("helvetica", "bold");
  pdf.text("Kernmodule der DTP sind:", marginLeft, y);
  y += 8;

  const bullets = [
    { title: "Identification", text: "Verschiedene Verfahren wie AutoIdent, VideoIdent oder vor-Ort-Identifikation, je nach regulatorischen Anforderungen." },
    { title: "Smart Data", text: "Intelligente Prüfungen wie Bonitätsbewertung (AI Credit Scores), Adressverifikation, Fraud Check und Compliance Screening – nahtlos eingebunden in den Onboarding-Prozess." },
    { title: "Signing", text: "Elektronische Signatur mit Unterstützung aller drei Signaturstufen (EES, FES, QES), rechtssicher und benutzerfreundlich." },
  ];

  bullets.forEach((b) => {
    pdf.setFont("helvetica", "bold");
    pdf.text(`• ${b.title}:`, marginLeft, y);
    pdf.setFont("helvetica", "normal");
    const bulletLines = pdf.splitTextToSize(b.text, maxTextWidth - 25);
    pdf.text(bulletLines, marginLeft + 25, y);
    y += bulletLines.length * 6 + 4;
  });
  y += 6;

  // Kacheln & REST API
  const kacheln = [
    { title: "Kunde", boxes: ["Self-Onboarding", "CRM", "Interne Applikation", "Externe Applikation"] },
    { title: "IDENTIFICATION", boxes: ["AutoIdent", "VideoIdent", "OnlineIdent", "QES-Ident (seal.ID)", "BankIdent (ab 2026)"] },
    { title: "SMART DATA", boxes: ["Credit Scores", "Data Reports", "Address", "Fraud", "Compliance", "ZEK/IKO/KREMO"] },
    { title: "SIGNING", boxes: ["EES", "FES", "QES", "SIGN"] },
  ];

  const boxWidth = 35;      // kleinere Kacheln für Seitenränder
  const boxSpacing = 8;
  const cardHeight = 10;
  const cardSpacing = 4;

  let xBase = marginLeft;
  const yBase = y;

  // Berechne Kachel 1 und REST API Abstand
  const restApiHeight = 14;
  const restApiWidth = 20;
  const restApiX = xBase + boxWidth + 10; // nach Kachel1
  const restApiY = yBase + 12; // mittig zur Höhe der Kachel1

  kacheln.forEach((k, i) => {
    let x = xBase + i * (boxWidth + boxSpacing);

    // Kachel Hintergrund abgerundet
    const kHeight = 12 + k.boxes.length * (cardHeight + cardSpacing);
    pdf.setFillColor(...colors.grayBox);
    pdf.roundedRect(x, yBase, boxWidth, kHeight, 2, 2, "F");

    // Kachel Titel
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(...colors.textDark);
    pdf.text(k.title, x + 2, yBase + 7);

    // Cards
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    k.boxes.forEach((b, j) => {
      pdf.setFillColor(...colors.intrumPurple);
      pdf.roundedRect(x, yBase + 12 + j * (cardHeight + cardSpacing), boxWidth, cardHeight, 2, 2, "F");
      pdf.setTextColor(...colors.textLight);
      pdf.text(b, x + 2, yBase + 12 + j * (cardHeight + cardSpacing) + 7);
    });
  });

  // REST API Balken
  const barY = yBase + 12 + 10; // leicht unterhalb Kachel-Titel
  const barHeight = kacheln[0].boxes.length * (cardHeight + cardSpacing) - 10;
  const barX = marginLeft;
  const barWidth = pageWidth - marginLeft - marginRight;
  pdf.setFillColor(220, 220, 220); // dunkleres Grau
  pdf.rect(barX, barY, barWidth, barHeight, "F");

  // REST API Text vorne
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.setTextColor(...colors.textDark);
  pdf.text("REST", restApiX, restApiY);
  pdf.text("API", restApiX, restApiY + 8);

  // Text unter Kacheln
  const unterText = "Ein besonderes Merkmal der DTP ist der hohe Sicherheitsstandard in der Betrugsprävention. So ermöglicht z. B. Device Fingerprinting eine frühzeitige Risikoerkennung anhand technischer Merkmale und schützt bereits vor Abschluss eines Prozesses vor potenziell betrügerischen Zugriffen. Gleichzeitig gewährleistet der Zugriff auf einen breit abgestützten Fraud Pool mit Millionen Transaktionen eine kontinuierliche Risikobewertung auf Basis vernetzter Erkenntnisse.\nDurch die Kombination aus modernster Technologie, regulatorischer Konformität und praxiserprobter Integration bietet die Digital Trust Platform eine zukunftssichere Grundlage für digitale Prozesse mit hoher Akzeptanz bei Endkundinnen und Endkunden – egal ob im Finanzbereich, E-Commerce, Mobilitätssektor oder in der öffentlichen Verwaltung.";
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  const unterLines = pdf.splitTextToSize(unterText, maxTextWidth);
  pdf.text(unterLines, marginLeft, yBase + kacheln[0].boxes.length * (cardHeight + cardSpacing) + 50);

  y += 12 + kacheln[0].boxes.length * (cardHeight + cardSpacing) + unterLines.length * 6;

}
  // =========================
  // ENDE SEITE 4
  // =========================

  // =========================
// SEITE 5 — SIGNING
// =========================
function drawSigningPage() {
  drawHeaderFooter(5);

  const marginLeft = 20;
  const marginRight = 20;
  const maxTextWidth = 210 - marginLeft - marginRight;

  let y = 20;

  // Titel
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(...colors.textDark);

  pdf.text("2 SIGNING", marginLeft, y);

  y += 8;

  // Einleitungstext
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(...colors.textDark);

  const introText =
    "Signing ermöglicht die digitale, medienbruchfreie und rechtskonforme Unterzeichnung von Dokumenten – wahlweise mit einfacher, fortgeschrittener oder qualifizierter elektronischer Signatur. Ideal für effiziente Vertragsabschlüsse im digitalen Raum.";

  const introLines = pdf.splitTextToSize(introText, maxTextWidth);

  pdf.text(introLines, marginLeft, y);

  y += introLines.length * 6 + 4;
}
// =========================
// ENDE SEITE 5
// =========================

  // =========================
  // SEITENAUFRUF (REIHENFOLGE)
  // =========================
  drawCover();        // Seite 1
  pdf.addPage();

  drawCompanyPage();  // Seite 2
  pdf.addPage();

  drawTableOfContents(); // Seite 3
  pdf.addPage();

  drawDTPPage();      // Seite 4
  pdf.addPage();

  pdf.addPage();      // Seite 5
  drawSigningPage();
  
  pdf.save(`Offerte_${data.company || "Angebot"}.pdf`);
}
