import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOfferPDF(data) {

  const pdf = new jsPDF({
    unit: "mm",
    format: "a4"
  });

  const colors = {
    primary: [0, 51, 153],
    dark: [20, 30, 60],
    text: [55, 65, 81],
    light: [245, 248, 252],
    border: [220, 226, 235]
  };

  // --------------------------------
  // GLOBAL HEADER / FOOTER
  // --------------------------------
  function drawHeaderFooter(page) {

    // Top bar
    pdf.setFillColor(...colors.primary);
    pdf.rect(0, 0, 210, 6, "F");

    // Logo placeholder
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(...colors.primary);
    pdf.text("INTRUM", 190, 12, { align: "right" });

    // Footer
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(140,140,140);

    pdf.text("Offerte – Digital Trust Platform", 20, 287);
    pdf.text(`Seite ${page}`, 190, 287, { align: "right" });
  }

  // --------------------------------
  // PAGE 1 COVER
  // --------------------------------
  function drawCover() {

    pdf.setFillColor(...colors.primary);
    pdf.rect(0,0,210,297,"F");

    pdf.setTextColor(255,255,255);
    pdf.setFontSize(28);
    pdf.setFont("helvetica","bold");
    pdf.text("Offerte",20,80);

    pdf.setFontSize(16);
    pdf.setFont("helvetica","normal");
    pdf.text("Digital Trust Platform",20,95);

    pdf.setFontSize(32);
    pdf.setFont("helvetica","bold");
    pdf.text("INTRUM",105,260,{align:"center"});
  }

  // --------------------------------
  // PAGE 2 COMPANY
  // --------------------------------
  function drawCompany() {

    drawHeaderFooter(2);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(20);
    pdf.setTextColor(...colors.dark);
    pdf.text("Unternehmensangaben",20,25);

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(11);
    pdf.setTextColor(...colors.text);
    pdf.text(
      "Die folgenden Informationen bilden die Grundlage für die Zusammenarbeit.",
      20,
      35,
      {maxWidth:170}
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
      headStyles:{fillColor:colors.light,textColor:colors.dark},
      styles:{fontSize:10.5,textColor:colors.text,lineColor:colors.border}
    });
  }

  // --------------------------------
  // PAGE 3 TOC
  // --------------------------------
  function drawTOC() {

    drawHeaderFooter(3);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(20);
    pdf.setTextColor(...colors.dark);
    pdf.text("Inhalt",20,25);

    const items = [
      "Digital Trust Platform Überblick",
      "Signing Optionen",
      "Preisübersicht",
      "Vertragsbedingungen"
    ];

    let y=45;

    items.forEach((item,i)=>{
      pdf.setFont("helvetica","normal");
      pdf.setFontSize(12);
      pdf.text(`${i+1}. ${item}`,20,y);
      pdf.text(`${i+4}`,190,y,{align:"right"});
      y+=12;
    });
  }

  // --------------------------------
  // PAGE 4 CONTENT
  // --------------------------------
  function drawDTP() {

    drawHeaderFooter(4);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(18);
    pdf.text("Digital Trust Platform",20,25);

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(11);
    pdf.text(
      "Die Digital Trust Platform ermöglicht eine sichere, skalierbare und vollständig digitale Kundeninteraktion.",
      20,
      35,
      {maxWidth:170}
    );

    const cards = [
      "Onboarding",
      "Identifikation",
      "Signing",
      "Archivierung"
    ];

    cards.forEach((c,i)=>{
      const x = 20 + (i%2)*85;
      const y = 60 + Math.floor(i/2)*40;

      pdf.setFillColor(...colors.light);
      pdf.rect(x,y,80,30,"F");

      pdf.setFont("helvetica","bold");
      pdf.text(c,x+5,y+10);
    });
  }

  // --------------------------------
  // PAGE 5 PRICING
  // --------------------------------
  function drawPricing() {

    drawHeaderFooter(5);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(18);
    pdf.text("Signing Optionen",20,25);

    const pricing = [
      ["EES","0.80 CHF"],
      ["FES","1.50 CHF"],
      ["QES","2.20 CHF"]
    ];

    pricing.forEach((p,i)=>{
      const x = 20 + i*60;

      pdf.setFillColor(...colors.light);
      pdf.rect(x,50,50,40,"F");

      pdf.setFont("helvetica","bold");
      pdf.text(p[0],x+5,65);

      pdf.setFont("helvetica","normal");
      pdf.text(p[1],x+5,80);
    });
  }

  // --------------------------------
  // PAGE 6 FINAL
  // --------------------------------
  function drawFinal() {

    drawHeaderFooter(6);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(18);
    pdf.text("Preisübersicht",20,25);

    autoTable(pdf,{
      startY:40,
      head:[["Beschreibung","Preis"]],
      body:[
        ["Setup Fee","5500 CHF"],
        ["Ongoing Fee","2500 CHF"],
        ["White Labeling","2500 CHF"]
      ],
      headStyles:{fillColor:colors.light},
      styles:{fontSize:10}
    });

    pdf.text(
      `Gültig bis: ${data.validUntil || ""}`,
      20,
      pdf.lastAutoTable.finalY + 20
    );
  }

  // BUILD PDF
  drawCover();
  pdf.addPage();

  drawCompany();
  pdf.addPage();

  drawTOC();
  pdf.addPage();

  drawDTP();
  pdf.addPage();

  drawPricing();
  pdf.addPage();

  drawFinal();

  pdf.save(`Offerte_${data.company || "Angebot"}.pdf`);
}
