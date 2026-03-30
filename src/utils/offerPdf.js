import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOfferPDF(data) {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  const colors = {
    primary: [23, 4, 86],      // Dunkles Purpur
    secondary: [120, 50, 180], // Mittleres Purpur
    accent: [150, 80, 210],    // Helles Glow-Purpur
    textDark: [45, 45, 45],
    textLight: [255,255,255],
    cardBg: [245,245,250],
    border: [220,220,230]
  };

  // ---------------------------------------
  // HEADER + FOOTER Funktion
  // ---------------------------------------
  function drawHeaderFooter(page) {
    // Oberer Streifen
    pdf.setFillColor(...colors.primary);
    pdf.rect(0, 0, 210, 6, "F");

    // Logo
    pdf.setFont("helvetica","bold");
    pdf.setFontSize(10);
    pdf.setTextColor(...colors.textLight);
    pdf.text("INTRUM", 190, 12, {align:"right"});

    // Footer
    pdf.setFont("helvetica","normal");
    pdf.setFontSize(9);
    pdf.setTextColor(120,120,120);
    pdf.text("Offerte – Digital Trust Platform", 20, 287);
    pdf.text(`Seite ${page}`, 190, 287, {align:"right"});
  }

  // ---------------------------------------
  // SEITE 1 – COVER
  // ---------------------------------------
  function drawCover() {
    // Farbverlauf: von dunkel nach hell (Intrum-Stil)
    const gradientSteps = 30;
    for (let i = 0; i < gradientSteps; i++) {
      const r = colors.primary[0] + ((colors.accent[0] - colors.primary[0]) * i / gradientSteps);
      const g = colors.primary[1] + ((colors.accent[1] - colors.primary[1]) * i / gradientSteps);
      const b = colors.primary[2] + ((colors.accent[2] - colors.primary[2]) * i / gradientSteps);
      pdf.setFillColor(r,g,b);
      pdf.rect(0, i * (297/gradientSteps), 210, 297/gradientSteps, "F");
    }

    // Titel
    pdf.setFont("helvetica","bold");
    pdf.setFontSize(28);
    pdf.setTextColor(...colors.textLight);
    pdf.text("Offerte", 20, 80);

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(16);
    pdf.text("Digital Trust Platform", 20, 95);

    // Markenname unten
    pdf.setFont("helvetica","bold");
    pdf.setFontSize(32);
    pdf.text("INTRUM", 105, 260, {align:"center"});
  }

  // ---------------------------------------
  // SEITE 2 – UNTERNEHMENSDATEN
  // ---------------------------------------
  function drawCompanyPage() {
    drawHeaderFooter(2);

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(11);
    pdf.setTextColor(...colors.textDark);
    pdf.text("Offerte erstellt von Intrum für die Firma:", 20, 20);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(20);
    pdf.setTextColor(...colors.secondary);
    pdf.text("Unternehmensangaben", 20, 35);

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(11);
    pdf.setTextColor(...colors.textDark);
    pdf.text(
      "Die folgenden Informationen bilden die Grundlage für die Zusammenarbeit.",
      20, 45, { maxWidth: 170 }
    );

    // Firmendaten Tabelle
    autoTable(pdf,{
      startY: 55,
      head:[["Angabe","Details"]],
      body:[
        ["Firmenname",data.company || "—"],
        ["UID",data.uid || "—"],
        ["Handelsregister",data.hrRegister || "—"],
        ["Adresse",data.street || "—"],
        ["PLZ / Ort",`${data.postcode || ""} ${data.city || ""}`],
        ["Kontaktperson",data.contactName || "—"],
        ["Telefon",data.contactPhone || "—"],
        ["E-Mail",data.contactEmail || "—"]
      ],
      headStyles:{fillColor:colors.cardBg,textColor:colors.textDark,fontStyle:"bold"},
      styles:{fontSize:10.5,textColor:colors.textDark,lineColor:colors.border}
    });
  }

  // ---------------------------------------
  // PDF erzeugen
  // ---------------------------------------
  drawCover();
  pdf.addPage();
  drawCompanyPage();

  pdf.save(`Offerte_${data.company || "Angebot"}.pdf`);
}
