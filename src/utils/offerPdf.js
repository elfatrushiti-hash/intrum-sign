import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOfferPDF(data) {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  const margin = 20;
  const contentWidth = 170;

  const colors = {
    darkViolet: [23, 4, 86],
    midViolet: [120, 50, 180],
    lightViolet: [180, 120, 220],
    intrumViolet: [120, 50, 180],
    textDark: [0,0,0],
    textLight: [255,255,255],
    cardBg: [245,245,250],
    border: [220,220,230],
    lightGray: [245,245,245]
  };

  // -------------------------------
  // Header & Footer
  // -------------------------------
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

  // -------------------------------
  // Seite 1 – Cover
  // -------------------------------
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

  // -------------------------------
  // Seite 2 – Unternehmensdaten
  // -------------------------------
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
    pdf.setTextColor(...colors.intrumViolet);
    pdf.text("Intrum AG, Eschenstrasse 12, 8603 Schwerzenbach",margin,y);

    y += 6;
    pdf.setFont("helvetica","normal");
    pdf.setTextColor(...colors.textDark);
    pdf.text("(nachfolgend Intrum genannt)",margin,y);

    y += 10;
    pdf.text("für",margin,y);

    y += 10;
    pdf.setFont("helvetica","bold");
    pdf.text("Firma (nachfolgend Partner genannt)",margin,y);

    // Block 1 – Unternehmensdaten
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

    // Block 2 – Kontaktperson
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

  // -------------------------------
  // Seite 3 – Inhaltsverzeichnis
  // -------------------------------
  function drawTableOfContents() {
    drawHeaderFooter(3);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(14);
    pdf.setTextColor(...colors.textDark);
    pdf.text("Inhalt", margin, 25);

    let y = 40;
    const toc = [
      {title:"1  Digital Trust Platform – Überblick", page:"4"},
      {title:"2  SIGNING", page:"5"},
      {title:"   2.1  EES – Einfache Signatur", page:"5"},
      {title:"   2.2  FES – Fortgeschrittene Signatur", page:"5"},
      {title:"   2.3  QES – Qualifizierte Signatur", page:"5"},
      {title:"   2.4  Identifikation / seal.ID", page:"5"},
      {title:"3  Setup Gebühren", page:"6"},
      {title:"4  Verschwiegenheitsklausel", page:"6"},
      {title:"5  Gültigkeit des Angebots", page:"6"}
    ];

    toc.forEach(row=>{
      pdf.setFont("helvetica","normal");
      pdf.setFontSize(10.5);
      pdf.setTextColor(...colors.textDark);
      pdf.text(row.title, margin, y);

      const textWidth = pdf.getTextWidth(row.title) + 2;
      const lineStartX = margin + textWidth;
      const lineEndX = 190;
      const numDots = Math.floor((lineEndX - lineStartX) / pdf.getTextWidth("."));
      let dots = ".".repeat(numDots);

      pdf.text(dots,lineStartX,y);
      pdf.text(row.page,190,y,{align:"right"});
      y += 8;
    });
  }

  // -------------------------------
  // Seite 4 – DTP Text + Bulletpoints + 4 getrennte Kacheln
  // -------------------------------
  function drawDTPPage() {
    drawHeaderFooter(4);

    let y = 25;

    // Titel
    pdf.setFont("helvetica","bold");
    pdf.setFontSize(16);
    pdf.setTextColor(...colors.intrumViolet);
    const title = "1  Digital Trust Platform – Die Grundlage für sichere und effiziente digitale Geschäftsprozesse";
    const titleLines = pdf.splitTextToSize(title, contentWidth);
    pdf.text(titleLines, margin, y);
    y += titleLines.length * 7 + 4;

    // Textabsätze
    pdf.setFont("helvetica","normal");
    pdf.setFontSize(11);
    pdf.setTextColor(...colors.textDark);

    const paragraph1 = "Die Digital Trust Platform (DTP) verbindet alle zentralen Elemente für ein durchgängig digitales und vertrauenswürdiges Onboarding in einer modular aufgebauten Lösung: von der Identifikation über Bonitäts- und Fraud-Prüfungen bis hin zur elektronischen Signatur – sicher, rechtskonform und effizient.";
    const paragraph2 = "Die Plattform wurde speziell dafür entwickelt, Unternehmen bei der Digitalisierung kritischer Prozesse zu unterstützen, ohne dabei Kompromisse bei Sicherheit, Nutzerfreundlichkeit oder regulatorischer Konformität einzugehen. Sie lässt sich flexibel in bestehende Systemlandschaften integrieren und ermöglicht so individuelle Customer Journeys mit hohem Automatisierungsgrad.";
    const paragraph3 = "Kernmodule der DTP sind:";

    pdf.text(pdf.splitTextToSize(paragraph1, contentWidth), margin, y);
    y += pdf.splitTextToSize(paragraph1, contentWidth).length * 6 + 4;

    pdf.text(pdf.splitTextToSize(paragraph2, contentWidth), margin, y);
    y += pdf.splitTextToSize(paragraph2, contentWidth).length * 6 + 8;

    pdf.setFont("helvetica","bold");
    pdf.text(paragraph3, margin, y);
    y += 6;

    const bulletPoints = [
      { title:"Identification", text:"Verschiedene Verfahren wie AutoIdent, VideoIdent oder vor-Ort-Identifikation, je nach regulatorischen Anforderungen." },
      { title:"Smart Data", text:"Intelligente Prüfungen wie Bonitätsbewertung (AI Credit Scores), Adressverifikation, Fraud Check und Compliance Screening – nahtlos eingebunden in den Onboarding-Prozess." },
      { title:"Signing", text:"Elektronische Signatur mit Unterstützung aller drei Signaturstufen (EES, FES, QES), rechtssicher und benutzerfreundlich." }
    ];

    bulletPoints.forEach(b=>{
      pdf.setFont("helvetica","bold");
      pdf.text("• " + b.title + ":", margin, y);
      pdf.setFont("helvetica","normal");
      const textLines = pdf.splitTextToSize(b.text, contentWidth - 28);
      pdf.text(textLines, margin + 28, y);
      y += textLines.length * 6 + 4;
    });

    // -------------------------------
    // 4 Getrennte Kacheln
    // -------------------------------
    const startY = y + 8;
    const colWidth = (contentWidth - 9) / 4;
    const boxHeight = 8;
    const boxSpacing = 3;

    const columns = [
      { title:"Kunde", items:["Self-Onboarding","CRM","Interne Applikation","Externe Applikation"] },
      { title:"IDENTIFICATION", items:["AutoIdent","VideoIdent","OnlineIdent","QES-Ident (seal.ID)","BankIdent (ab 2026)","E-ID (ab 2026)"] },
      { title:"SMART DATA", items:["Credit Scores","Data Reports","Address","Fraud","Compliance","ZEK/IKO/KREMO"] },
      { title:"SIGNING", items:["EES","FES","QES","SIGN"] }
    ];

    columns.forEach((col,index)=>{
      const x = margin + (index * (colWidth + 3));
      let yPos = startY;

      // Hintergrund Kachel
      pdf.setFillColor(...colors.lightGray);
      pdf.rect(x-2,yPos-2,colWidth+4,boxHeight*col.items.length + boxSpacing*(col.items.length-1) + 14,"F");

      pdf.setFont("helvetica","bold");
      pdf.setFontSize(11);
      pdf.setTextColor(...colors.textDark);
      pdf.text(col.title, x, yPos);
      yPos += 6;

      col.items.forEach(item=>{
        pdf.setFillColor(...colors.intrumViolet);
        pdf.roundedRect(x,yPos,colWidth,boxHeight,1,1,"F");
        pdf.setFont("helvetica","normal");
        pdf.setFontSize(8.5);
        pdf.setTextColor(...colors.textLight);
        pdf.text(item, x+colWidth/2, yPos+5, {align:"center"});
        yPos += boxHeight + boxSpacing;
      });
    });
  }

  // -------------------------------
  // PDF erzeugen
  // -------------------------------
  drawCover();
  pdf.addPage();
  drawCompanyPage();
  pdf.addPage();
  drawTableOfContents();
  pdf.addPage();
  drawDTPPage();

  pdf.save(`Offerte_${data.company || "Angebot"}.pdf`);
}
