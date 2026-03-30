import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ---------------------------------------------
// ✅ Deckblatt als saubere Funktion (neutral)
// ---------------------------------------------
function drawCoverPage(pdf) {
  // Farben
  const purpleDark = [23, 4, 86];
  const purpleMid = [120, 50, 180];
  const purpleSoft = [140, 70, 200];
  const white = [255, 255, 255];

  // Hintergrundfläche
  pdf.setFillColor(...purpleDark);
  pdf.rect(0, 0, 210, 297, "F");

  // Glow 1
  pdf.setFillColor(140, 70, 200, 0.50);
  pdf.circle(40, 60, 60, "F");

  // Glow 2
  pdf.setFillColor(120, 50, 180, 0.30);
  pdf.circle(120, 150, 80, "F");

  // Glow 3
  pdf.setFillColor(150, 80, 210, 0.35);
  pdf.circle(180, 260, 100, "F");

  // Titel
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(30);
  pdf.setTextColor(...white);
  pdf.text("Offerte", 25, 60);

  // Untertitel
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(16);
  pdf.text("Digital Onboarding", 25, 80);

  // Markenname unten
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(32);
  pdf.text("intrum", 105, 265, { align: "center" });
}

// ---------------------------------------------
// ✅ Hauptfunktion
// ---------------------------------------------
export function exportOfferPDF(data) {
  const pdf = new jsPDF({
    unit: "mm",
    format: "a4"
  });

  // Seite 1
  drawCoverPage(pdf);

  // Seite 2 usw.
  pdf.addPage();

  // Hier baust du deine restlichen Seiten ein…
  // ---------------------------------------------
// ✅ Seite 2 – Firmen-Informationen (neutral)
// ---------------------------------------------
function drawCompanyPage(pdf, data) {
  // Farben
  const grayLight = [240, 240, 240];
  const textDark = [0, 0, 0];

  // Titel / Überschrift
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(...textDark);
  pdf.text("Firmeninformationen", 20, 20);

  // Tabelle
  autoTable(pdf, {
    startY: 35,
    head: [["Feld", "Wert"]],
    body: [
      ["Firmenname", data.company || ""],
      ["UID", data.uid || ""],
      ["Handelsregister", data.hrRegister || ""],
      ["Strasse / Nr", data.street || ""],
      ["PLZ / Ort", `${data.postcode || ""} ${data.city || ""}`],
      ["Postfach", data.poBox || ""],
      ["PLZ/Ort (Postfach)", data.poPostcode || ""],
      ["Kontaktperson", data.contactName || ""],
      ["Telefon", data.contactPhone || ""],
      ["E-Mail", data.contactEmail || ""],
    ],
    headStyles: { fillColor: grayLight },
    styles: { font: "helvetica", fontSize: 10 },
    margin: { left: 20, right: 20 }
  });
}


  pdf.save("Offerte.pdf");
}
