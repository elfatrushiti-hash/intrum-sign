import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOfferPDF(data) {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  const margin = 20;
  const pageWidth = 210;
  const contentWidth = pageWidth - (margin * 2);

  const colors = {
    darkViolet: [23, 4, 86],
    lightViolet: [180, 120, 220],
    intrumViolet: [120, 50, 180],
    textDark: [0,0,0],
    textLight: [255,255,255],
    lightGray: [240,240,245]
  };

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

  function drawCompanyPage() {
    drawHeaderFooter(2);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(22);
    pdf.setTextColor(...colors.intrumViolet);
    pdf.text("Offerte", margin, 30);

    let y = 55;

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(11);
    pdf.setTextColor(...colors.textDark);
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
      headStyles:{ fillColor: colors.intrumViolet, textColor:255 },
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
      headStyles:{ fillColor: colors.intrumViolet, textColor:255 },
      body:[
        ["Name",data.contactName || "—"],
        ["Telefon",data.contactPhone || "—"],
        ["E-Mail",data.contactEmail || "—"]
      ]
    });
  }

  function drawTableOfContents() {
    drawHeaderFooter(3);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(22);
    pdf.setTextColor(...colors.textDark);
    pdf.text("Inhalt", margin, 25);

    let y = 40;

    const toc = [
      { title: "1  Digital Trust Platform – Überblick", page: "4" },
      { title: "2  SIGNING", page: "5" },
      { title: "3  Setup Gebühren", page: "6" },
      { title: "4  Verschwiegenheitsklausel", page: "6" },
      { title: "5  Gültigkeit des Angebots", page: "6" },
    ];

    toc.forEach(row => {
      pdf.text(row.title, margin, y);
      pdf.text(row.page, pageWidth - margin, y, {align:"right"});
      y += 10;
    });
  }

  function drawArchitecture(yStart){

    const colCount = 4;
    const colWidth = contentWidth / colCount;

    const boxHeight = 8;
    const boxSpacing = 3;

    const columns = [
      {
        title:"Kunde",
        items:[
          "Self-Onboarding",
          "CRM",
          "Interne Applikation",
          "Externe Applikation"
        ]
      },
      {
        title:"IDENTIFICATION",
        items:[
          "AutoIdent",
          "VideoIdent",
          "OnlineIdent",
          "QES-Ident (seal.ID)",
          "BankIdent (ab 2026)",
          "E-ID (ab 2026)"
        ]
      },
      { title:"", items:[] },
      { title:"", items:[] }
    ];

    const apiY = yStart + 40;
    pdf.setFillColor(...colors.lightGray);
    pdf.rect(margin, apiY, contentWidth, 9, "F");

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(10);
    pdf.setTextColor(...colors.textDark);
    pdf.text("REST API", margin + contentWidth/2, apiY + 6, {align:"center"});

    columns.forEach((col,index)=>{
      const x = margin + (index * colWidth);
      let y = yStart;

      pdf.setFont("helvetica","bold");
      pdf.setFontSize(11);
      pdf.setTextColor(...colors.textDark);
      pdf.text(col.title, x, y);

      y += 6;

      col.items.forEach(item=>{

        pdf.setFillColor(...colors.intrumViolet);
        pdf.roundedRect(x,y,colWidth-3,boxHeight,1.2,1.2,"F");

        pdf.setFont("helvetica","normal");
        pdf.setFontSize(8.5);
        pdf.setTextColor(...colors.textLight);

        pdf.text(item,x+(colWidth-3)/2,y+5,{align:"center"});

        y += boxHeight + boxSpacing;
      });
    });
  }

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
      "Die Digital Trust Platform (DTP) verbindet alle zentralen Elemente für ein durchgängig digitales und vertrauenswürdiges Onboarding in einer modular aufgebauten Lösung.";

    const textLines = pdf.splitTextToSize(paragraph, contentWidth);
    pdf.text(textLines, margin, y);
    y += textLines.length * 6 + 10;

    pdf.setFont("helvetica","bold");
    pdf.text("Kernmodule der DTP sind:", margin, y);
    y += 8;

    pdf.setFont("helvetica","normal");
    pdf.text("Identification: ...", margin, y);
    y += 6;
    pdf.text("Smart Data: ...", margin, y);
    y += 6;
    pdf.text("Signing: ...", margin, y);

    /* GRAFIK UNTEN */
    drawArchitecture(200);
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
