import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOfferPDF(data) {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  const margin = 20;
  const pageWidth = 210;
  const contentWidth = pageWidth - (margin * 2);

  const colors = {
    darkViolet: [23, 4, 86],
    midViolet: [120, 50, 180],
    lightViolet: [180, 120, 220],
    intrumViolet: [120, 50, 180],
    textDark: [0,0,0],
    textLight: [255,255,255],
    cardBg: [245,245,250],
    border: [220,220,230]
  };

  // ---------------------------------------
  // HEADER + FOOTER
  // ---------------------------------------
  function drawHeaderFooter(page) {
    pdf.setFillColor(...colors.intrumViolet);
    pdf.rect(0, 0, 210, 6, "F");

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(10);
    pdf.setTextColor(...colors.textLight);
    pdf.text("INTRUM", 190, 12, {align:"right"});

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(9);
    pdf.setTextColor(120,120,120);
    pdf.text("Offerte – Digital Trust Platform", margin, 287);
    pdf.text(`Seite ${page}`, 190, 287, {align:"right"});
  }

  // ---------------------------------------
  // COVER
  // ---------------------------------------
  function drawCover() {
    const steps = 100;
    for (let i=0; i<steps; i++) {
      const r = colors.darkViolet[0] + ((colors.lightViolet[0]-colors.darkViolet[0]) * i/steps);
      const g = colors.darkViolet[1] + ((colors.lightViolet[1]-colors.darkViolet[1]) * i/steps);
      const b = colors.darkViolet[2] + ((colors.lightViolet[2]-colors.darkViolet[2]) * i/steps);
      pdf.setFillColor(r,g,b);
      pdf.rect(0, i*(297/steps), 210, 297/steps, "F");
    }

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(28);
    pdf.setTextColor(...colors.textLight);
    pdf.text("Offerte", margin, 80);

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(16);
    pdf.text("Digital Trust Platform", margin, 95);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(32);
    pdf.text("INTRUM", 105, 260, {align:"center"});
  }

  // ---------------------------------------
  // SEITE 2
  // ---------------------------------------
  function drawCompanyPage() {
    drawHeaderFooter(2);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(22);
    pdf.setTextColor(...colors.intrumViolet);
    pdf.text("Offerte", margin, 30);

    let y = 55;

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(11);
    pdf.text("Ausgearbeitet von",margin,y);

    y += 10;
    pdf.setFont("helvetica","bold");
    pdf.text("Intrum AG, Eschenstrasse 12, 8603 Schwerzenbach",margin,y);

    y += 6;
    pdf.setFont("helvetica","normal");
    pdf.text("(nachfolgend Intrum genannt)",margin,y);

    y += 10;
    pdf.text("für",margin,y);

    y += 10;
    pdf.setFont("helvetica","bold");
    pdf.text("Firma (nachfolgend Partner genannt)",margin,y);

    autoTable(pdf,{
      startY: y + 8,
      margin: { left: margin, right: margin },
      head:[["Angabe","Details"]],
      body:[
        ["Firmenname",data.company || "—"],
        ["UID",data.uid || "—"],
        ["Handelsregister",data.hrRegister || "—"],
        ["Adresse",data.street || "—"],
        ["PLZ / Ort",`${data.postcode || ""} ${data.city || ""}`]
      ]
    });

    autoTable(pdf,{
      startY: pdf.lastAutoTable.finalY + 15,
      margin: { left: margin, right: margin },
      head:[["Ansprechperson","Details"]],
      body:[
        ["Name",data.contactName || "—"],
        ["Telefon",data.contactPhone || "—"],
        ["E-Mail",data.contactEmail || "—"]
      ]
    });
  }

  // ---------------------------------------
  // SEITE 3
  // ---------------------------------------
  function drawTableOfContents() {
    drawHeaderFooter(3);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(22);
    pdf.setTextColor(...colors.intrumViolet);
    pdf.text("Inhalt", margin, 25);

    let y = 40;

    const toc = [
      { title: "1  Digital Trust Platform – Überblick", page: "4" },
      { title: "2  SIGNING", page: "5" },
      { title: "3  Setup Gebühren", page: "6" },
      { title: "4  Verschwiegenheitsklausel", page: "6" },
      { title: "5  Gültigkeit des Angebots", page: "6" },
    ];

    function dottedLine(text, y) {
      const textWidth = pdf.getTextWidth(text);
      const startX = margin + textWidth + 2;
      const endX = pageWidth - margin - 8;

      for (let x=startX; x<endX; x+=2) {
        pdf.circle(x, y, 0.3, "F");
      }
    }

    toc.forEach(row => {
      pdf.text(row.title, margin, y);
      dottedLine(row.title, y);
      pdf.text(row.page, pageWidth - margin, y, {align:"right"});
      y += 10;
    });
  }

  // ---------------------------------------
  // SEITE 4
  // ---------------------------------------
  function drawDTPPage() {
    drawHeaderFooter(4);

    let y = 25;

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(18);
    pdf.setTextColor(...colors.intrumViolet);

    const title =
      "1  Digital Trust Platform – Die Grundlage für sichere und effiziente digitale Geschäftsprozesse";

    const titleLines = pdf.splitTextToSize(title, contentWidth);
    pdf.text(titleLines, margin, y);
    y += titleLines.length * 8 + 5;

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(11);
    pdf.setTextColor(...colors.textDark);

    const paragraph =
      "Die Digital Trust Platform (DTP) verbindet alle zentralen Elemente für ein durchgängig digitales und vertrauenswürdiges Onboarding in einer modular aufgebauten Lösung: von der Identifikation über Bonitäts- und Fraud-Prüfungen bis hin zur elektronischen Signatur – sicher, rechtskonform und effizient. " +
      "Die Plattform wurde speziell dafür entwickelt, Unternehmen bei der Digitalisierung kritischer Prozesse zu unterstützen, ohne dabei Kompromisse bei Sicherheit, Nutzerfreundlichkeit oder regulatorischer Konformität einzugehen. " +
      "Sie lässt sich flexibel in bestehende Systemlandschaften integrieren und ermöglicht so individuelle Customer Journeys mit hohem Automatisierungsgrad.";

    const textLines = pdf.splitTextToSize(paragraph, contentWidth);
    pdf.text(textLines, margin, y);
    y += textLines.length * 6 + 10;

    pdf.setFont("helvetica","bold");
    pdf.text("Kernmodule der DTP sind:", margin, y);
    y += 10;

    const bulletIndent = margin + 5;
    const textIndent = margin + 25;
    const bulletWidth = pageWidth - textIndent - margin;

    const bullets = [
      {
        title:"Identification:",
        text:"Verschiedene Verfahren wie AutoIdent, VideoIdent oder vor-Ort-Identifikation, je nach regulatorischen Anforderungen."
      },
      {
        title:"Smart Data:",
        text:"Intelligente Prüfungen wie Bonitätsbewertung (AI Credit Scores), Adressverifikation, Fraud Check und Compliance Screening – nahtlos eingebunden in den Onboarding-Prozess."
      },
      {
        title:"Signing:",
        text:"Elektronische Signatur mit Unterstützung aller drei Signaturstufen (EES, FES, QES), rechtssicher und benutzerfreundlich."
      }
    ];

    bullets.forEach(b => {

      pdf.circle(bulletIndent - 3, y-2, 1, "F");

      pdf.setFont("helvetica","bold");
      pdf.text(b.title, bulletIndent, y);

      const titleWidth = pdf.getTextWidth(b.title);

      pdf.setFont("helvetica","normal");
      const lines = pdf.splitTextToSize(
        b.text,
        bulletWidth - titleWidth
      );

      pdf.text(lines, bulletIndent + titleWidth + 2, y);

      y += lines.length * 6 + 6;
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
