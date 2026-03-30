import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOfferPDF(data) {

  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  const colors = {
    primary: [23, 4, 86],      // Dunkles Purpur
    secondary: [120, 50, 180], // Mittleres Purpur
    accent: [150, 80, 210],    // Glow
    textDark: [45, 45, 45],
    textLight: [255,255,255],
    cardBg: [245,245,250],
    border: [220,220,230]
  };

  // ---------------------------
  // HEADER + FOOTER
  // ---------------------------
  function drawHeaderFooter(page) {
    // Top Bar
    pdf.setFillColor(...colors.primary);
    pdf.rect(0, 0, 210, 6, "F");

    // Logo Placeholder
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

  // ---------------------------
  // COVER PAGE
  // ---------------------------
  function drawCover() {
    pdf.setFillColor(...colors.primary);
    pdf.rect(0,0,210,297,"F");

    pdf.setTextColor(...colors.textLight);
    pdf.setFont("helvetica","bold");
    pdf.setFontSize(28);
    pdf.text("Offerte",20,80);

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(16);
    pdf.text("Digital Trust Platform",20,95);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(32);
    pdf.text("INTRUM",105,260,{align:"center"});
  }

  // ---------------------------
  // COMPANY PAGE (Seite 2)
  // ---------------------------
  function drawCompany() {

    drawHeaderFooter(2);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(20);
    pdf.setTextColor(...colors.secondary);
    pdf.text("Unternehmensangaben",20,25);

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(11);
    pdf.setTextColor(...colors.textDark);
    pdf.text(
      "Die folgenden Informationen bilden die Grundlage für die Zusammenarbeit.",
      20, 35, { maxWidth: 170 }
    );

    autoTable(pdf,{
      startY:45,
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

  // ---------------------------
  // PRODUCTS PAGE (Alle Produkte auf einer Seite)
  // ---------------------------
  function drawProducts() {

    drawHeaderFooter(3);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(18);
    pdf.setTextColor(...colors.secondary);
    pdf.text("Produkte & Module",20,25);

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(11);
    pdf.setTextColor(...colors.textDark);
    pdf.text("Übersicht aller verfügbaren Module und Preise:",20,35);

    const modules = [
      { title:"Onboarding", desc:"Digitale Kundenaufnahme", price:data.onboarding || "—" },
      { title:"Identifikation", desc:"KYC & Verifizierung", price:data.identification || "—" },
      { title:"Signing", desc:"Elektronische Signatur", price:data.signing || "—" },
      { title:"Archivierung", desc:"Sichere Dokumentenablage", price:data.archiving || "—" },
      { title:"Seal.ID", desc:"Authentifizierung", price:data.sealId || "—" },
      { title:"Reporting", desc:"Datenanalyse & Reports", price:data.reporting || "—" }
    ];

    const startX = 20;
    const startY = 50;
    const colWidth = 80;
    const colHeight = 30;
    const gapX = 10;
    const gapY = 10;
    let x = startX;
    let y = startY;

    modules.forEach((m,i)=>{
      pdf.setFillColor(...colors.secondary);
      pdf.rect(x,y,colWidth,colHeight,"F");

      pdf.setFont("helvetica","bold");
      pdf.setFontSize(11);
      pdf.setTextColor(...colors.textLight);
      pdf.text(m.title,x+5,y+8);

      pdf.setFont("helvetica","normal");
      pdf.setFontSize(10);
      pdf.text(m.desc,x+5,y+16);
      pdf.text(`Preis: ${m.price}`,x+5,y+24);

      // Position für nächste Karte
      if ((i+1)%2 === 0) {
        x = startX;
        y += colHeight + gapY;
      } else {
        x += colWidth + gapX;
      }
    });
  }

  // ---------------------------
  // FINAL SUMMARY PAGE
  // ---------------------------
  function drawFinal() {

    drawHeaderFooter(4);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(18);
    pdf.setTextColor(...colors.secondary);
    pdf.text("Zusammenfassung & Bedingungen",20,25);

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(11);
    pdf.setTextColor(...colors.textDark);
    pdf.text(
      `Gültig bis: ${data.validUntil || "—"}`,
      20, 40
    );

    pdf.text(
      "Dieses Dokument stellt eine Übersicht aller Module und Preise dar. Alle Angaben ohne Gewähr.",
      20, 50, { maxWidth:170, lineHeightFactor:1.4 }
    );
  }

  // ---------------------------
  // BUILD PDF
  // ---------------------------
  drawCover();
  pdf.addPage();

  drawCompany();
  pdf.addPage();

  drawProducts();
  pdf.addPage();

  drawFinal();

  pdf.save(`Offerte_${data.company || "Angebot"}.pdf`);
}
