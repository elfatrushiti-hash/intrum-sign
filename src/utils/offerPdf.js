// -------------------------------
// Seite 4 – DTP Text + Bulletpoints + 4 Kacheln
// -------------------------------
function drawDTPPage() {
  drawHeaderFooter(4);

  let y = 25;

  pdf.setFont("helvetica","bold");
  pdf.setFontSize(16);
  pdf.setTextColor(...colors.intrumViolet);

  const title =
    "1  Digital Trust Platform – Die Grundlage für sichere und effiziente digitale Geschäftsprozesse";

  const titleLines = pdf.splitTextToSize(title, contentWidth);
  pdf.text(titleLines, margin, y);
  y += titleLines.length * 7 + 4;

  pdf.setFont("helvetica","normal");
  pdf.setFontSize(11);
  pdf.setTextColor(...colors.textDark);

  const paragraph1 =
    "Die Digital Trust Platform (DTP) verbindet alle zentralen Elemente für ein durchgängig digitales und vertrauenswürdiges Onboarding in einer modular aufgebauten Lösung: von der Identifikation über Bonitäts- und Fraud-Prüfungen bis hin zur elektronischen Signatur – sicher, rechtskonform und effizient.";

  const paragraph2 =
    "Die Plattform wurde speziell dafür entwickelt, Unternehmen bei der Digitalisierung kritischer Prozesse zu unterstützen, ohne dabei Kompromisse bei Sicherheit, Nutzerfreundlichkeit oder regulatorischer Konformität einzugehen. Sie lässt sich flexibel in bestehende Systemlandschaften integrieren und ermöglicht so individuelle Customer Journeys mit hohem Automatisierungsgrad.";

  const paragraph3 = "Kernmodule der DTP sind:";

  const bulletPoints = [
    { title:"Identification", text:"Verschiedene Verfahren wie AutoIdent, VideoIdent oder vor-Ort-Identifikation, je nach regulatorischen Anforderungen." },
    { title:"Smart Data", text:"Intelligente Prüfungen wie Bonitätsbewertung (AI Credit Scores), Adressverifikation, Fraud Check und Compliance Screening – nahtlos eingebunden in den Onboarding-Prozess." },
    { title:"Signing", text:"Elektronische Signatur mit Unterstützung aller drei Signaturstufen (EES, FES, QES), rechtssicher und benutzerfreundlich." }
  ];

  pdf.text(pdf.splitTextToSize(paragraph1, contentWidth), margin, y);
  y += pdf.splitTextToSize(paragraph1, contentWidth).length * 6 + 4;

  pdf.text(pdf.splitTextToSize(paragraph2, contentWidth), margin, y);
  y += pdf.splitTextToSize(paragraph2, contentWidth).length * 6 + 8;

  pdf.setFont("helvetica","bold");
  pdf.text(paragraph3, margin, y);
  y += 6;

  bulletPoints.forEach(b=>{
    pdf.setFont("helvetica","bold");
    pdf.text("• " + b.title + ":", margin, y);
    pdf.setFont("helvetica","normal");
    const textLines = pdf.splitTextToSize(b.text, contentWidth - 28);
    pdf.text(textLines, margin + 28, y);
    y += textLines.length * 6 + 4;
  });

  // -------------------------------
  // Kacheln – 4 Einheiten
  // -------------------------------
  const startY = y + 8;
  const colWidth = (contentWidth - 9) / 4; // 4 Kacheln nebeneinander
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

    // Leichter grauer Hintergrund für die Einheit
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
