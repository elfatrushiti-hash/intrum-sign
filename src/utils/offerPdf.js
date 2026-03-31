import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOfferPDF(data) {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  const colors = {
    darkViolet: [23, 4, 86],
    midViolet: [120, 50, 180],
    lightViolet: [180, 120, 220],
    intrumViolet: [23, 4, 86],
    textDark: [0,0,0],
    textLight: [255,255,255],
    cardBg: [245,245,250],
    border: [220,220,230],
    grayBlock: [240,240,245]
  };

  // ------------------------------
  // HEADER + FOOTER
  // ------------------------------
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

  // ------------------------------
  // SEITE 2 – UNTERNEHMENSDATEN
  // ------------------------------
  function drawCompanyPage() {
    drawHeaderFooter(2);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(22);
    pdf.setTextColor(...colors.intrumViolet);
    pdf.text("Offerte", 20, 30);

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

    // Unternehmensdaten
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

    // Kontaktperson
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

  // ------------------------------
  // SEITE 3 – INHALTSVERZEICHNIS
  // ------------------------------
  function drawTableOfContents() {
    drawHeaderFooter(3);

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(16);
    pdf.setTextColor(...colors.textDark);
    pdf.text("Inhalt",20,20);

    let y = 40;
    const toc = [
      { title: "1 Digital Trust Platform – Überblick", page: "4" },
      { title: "2 SIGNING", page: "5" },
      { title: "   2.1 EES – Einfache Signatur", page: "5" },
      { title: "   2.2 FES – Fortgeschrittene Signatur", page: "5" },
      { title: "   2.3 QES – Qualifizierte Signatur", page: "5" },
      { title: "   2.4 Identifikation / seal.ID", page: "5" },
      { title: "3 Setup Gebühren", page: "6" },
      { title: "4 Verschwiegenheitsklausel", page: "6" },
      { title: "5 Gültigkeit des Angebots", page: "6" }
    ];

    toc.forEach(row=>{
      pdf.setFont("helvetica","normal");
      pdf.setFontSize(11);
      pdf.text(row.title,20,y);

      const textWidth = pdf.getTextWidth(row.title);
      const startX = 20 + textWidth + 2;
      const endX = 190; // fast bis Seitenzahl
      const dotCount = Math.floor((endX-startX)/2);
      const dots = ".".repeat(dotCount);
      pdf.text(dots,startX,y);

      pdf.text(row.page, 190, y,{align:"right"});
      y += 10;
    });
  }

  // ------------------------------
  // SEITE 4 – DTP TEXT + BULLETPOINTS + 4 KACHELN
  // ------------------------------
  function drawDTPPage() {
    drawHeaderFooter(4);

    // Titel
    pdf.setFont("helvetica","bold");
    pdf.setFontSize(14);
    pdf.setTextColor(...colors.textDark);
    const title = "1 Digital Trust Platform – Die Grundlage für sichere und effiziente digitale Geschäftsprozesse";
    pdf.text(title,20,20,{maxWidth:170});

    let y = 35;

    // Einleitungstext
    pdf.setFont("helvetica","normal");
    pdf.setFontSize(11);
    const paragraph1 = "Die Digital Trust Platform (DTP) verbindet alle zentralen Elemente für ein durchgängig digitales und vertrauenswürdiges Onboarding in einer modular aufgebauten Lösung: von der Identifikation über Bonitäts- und Fraud-Prüfungen bis hin zur elektronischen Signatur – sicher, rechtskonform und effizient.";
    pdf.text(paragraph1,20,y,{maxWidth:170,lineHeightFactor:1.4});
    y += 20;

    const paragraph2 = "Die Plattform wurde speziell dafür entwickelt, Unternehmen bei der Digitalisierung kritischer Prozesse zu unterstützen, ohne dabei Kompromisse bei Sicherheit, Nutzerfreundlichkeit oder regulatorischer Konformität einzugehen. Sie lässt sich flexibel in bestehende Systemlandschaften integrieren und ermöglicht so individuelle Customer Journeys mit hohem Automatisierungsgrad.";
    pdf.text(paragraph2,20,y,{maxWidth:170,lineHeightFactor:1.4});
    y += 20;

    pdf.setFont("helvetica","bold");
    pdf.text("Kernmodule der DTP sind:",20,y);
    y += 10;

    const modules = [
      { title:"Identification", items:["AutoIdent","VideoIdent","OnlineIdent","QES-Ident (seal.ID)","BankIdent (ab 2026)"] },
      { title:"Smart Data", items:["Credit Scores","Data Reports","Address","Fraud","Compliance","ZEK/IKO/KREMO"] },
      { title:"Signing", items:["EES","FES","QES","SIGN"] }
    ];

    pdf.setFont("helvetica","normal");

    modules.forEach(mod=>{
      pdf.setFont("helvetica","bold");
      pdf.text("• "+mod.title+":",20,y);
      pdf.setFont("helvetica","normal");

      mod.items.forEach(item=>{
        pdf.text("    " + item,30,y);
        y+=7;
      });
      y += 8;
    });
  }

  // ------------------------------
  // ERSTELLUNG PDF
  // ------------------------------
  drawCompanyPage();
  pdf.addPage();
  drawTableOfContents();
  pdf.addPage();
  drawDTPPage();

  pdf.save(`Offerte_${data.company || "Angebot"}.pdf`);
}
