import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOfferPDF(data) {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

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
    pdf.text("Offerte – Digital Trust Platform", 20, 287);
    pdf.text(`Seite ${page}`, 190, 287, {align:"right"});
  }

  // ---------------------------------------
  // COVER PAGE
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
    pdf.text("Offerte", 20, 80);

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(16);
    pdf.text("Digital Trust Platform", 20, 95);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(32);
    pdf.text("INTRUM", 105, 260, {align:"center"});
  }

  // ---------------------------------------
  // SEITE 2 – UNTERNEHMENSDATEN
  // ---------------------------------------
  function drawCompanyPage() {
    drawHeaderFooter(2);

    // Titel Offerte
    pdf.setFont("helvetica","bold");
    pdf.setFontSize(22);
    pdf.setTextColor(...colors.intrumViolet);
    pdf.text("Offerte", 20, 30);

    // Text darunter mit Abstand
    let y = 55;
    pdf.setFont("helvetica","normal");
    pdf.setFontSize(11);
    pdf.setTextColor(...colors.textDark);
    pdf.text("Ausgearbeitet von",20,y);

    y += 10;
    pdf.setFont("helvetica","bold");
    pdf.text("Intrum AG, Eschenstrasse 12, 8603 Schwerzenbach",20,y);

    y += 6;
    pdf.setFont("helvetica","normal");
    pdf.text("(nachfolgend Intrum genannt)",20,y);

    y += 10;
    pdf.text("für",20,y);

    y += 10;
    pdf.setFont("helvetica","bold");
    pdf.text("Firma (nachfolgend Partner genannt)",20,y);

    // Block 1: Unternehmensdaten
    autoTable(pdf,{
      startY: y + 8,
      head:[["Angabe","Details"]],
      body:[
        ["Firmenname",data.company || "—"],
        ["UID",data.uid || "—"],
        ["Handelsregister",data.hrRegister || "—"],
        ["Adresse",data.street || "—"],
        ["PLZ / Ort",`${data.postcode || ""} ${data.city || ""}`]
      ],
      headStyles:{fillColor:colors.cardBg,textColor:colors.textDark,fontStyle:"bold"},
      styles:{fontSize:10.5,textColor:colors.textDark,lineColor:colors.border}
    });

    // Block 2: Kontaktperson
    autoTable(pdf,{
      startY: pdf.lastAutoTable.finalY + 15,
      head:[["Ansprechperson","Details"]],
      body:[
        ["Name",data.contactName || "—"],
        ["Telefon",data.contactPhone || "—"],
        ["E-Mail",data.contactEmail || "—"]
      ],
      headStyles:{fillColor:colors.cardBg,textColor:colors.textDark,fontStyle:"bold"},
      styles:{fontSize:10.5,textColor:colors.textDark,lineColor:colors.border}
    });
  }

  // ---------------------------------------
  // SEITE 3 – MODERNES INHALTSVERZEICHNIS
  // ---------------------------------------
  function drawTableOfContents() {
    drawHeaderFooter(3);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(22);
    pdf.setTextColor(...colors.intrumViolet);
    pdf.text("Inhalt", 20, 25);

    let y = 40;

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

    // Funktion: gepunktete Linie von nach dem Text bis zur Seitenzahl
    function drawDottedLineAfterText(text, y, pageX) {
      const textWidth = pdf.getTextWidth(text) + 2; // kleine Lücke nach Text
      const startX = 20 + textWidth;
      const endX = pageX - 8; // Abstand von Seitenzahl
      const dotSpacing = 2;
      for (let x = startX; x < endX; x += dotSpacing) {
        pdf.circle(x, y, 0.3, "F");
      }
    }

    toc.forEach(row => {
      pdf.setFont("helvetica","normal");
      pdf.setFontSize(12);
      pdf.setTextColor(...colors.textDark);

      // Text links
      pdf.text(row.title, 20, y);

      // Gepunktete Linie nach Text bis rechts
      drawDottedLineAfterText(row.title, y, 190);

      // Seitenzahl rechts
      pdf.text(row.page, 190, y, { align: "right" });

      y += 10;
    });
  }

  // ---------------------------------------
  // PDF erzeugen
  // ---------------------------------------
  drawCover();
  pdf.addPage();
  drawCompanyPage();
  pdf.addPage();
  drawTableOfContents();

  pdf.save(`Offerte_${data.company || "Angebot"}.pdf`);
}
