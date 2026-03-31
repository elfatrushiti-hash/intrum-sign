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
    const maxTextWidth = 210 - marginLeft - 20;

    let y = 20;

    // (Rest deiner Seite 4 bleibt UNVERÄNDERT)
    // ...
  }
  // =========================
  // ENDE SEITE 4
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

  pdf.save(`Offerte_${data.company || "Angebot"}.pdf`);
}
