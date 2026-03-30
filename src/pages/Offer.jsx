import React, { useState, useEffect } from "react";

// MAIN COMPONENT
export default function Offer() {

  // -----------------------------
  // ✅ STATE: ALLE OFFERT-DATEN
  // -----------------------------
  const [offerData, setOfferData] = useState({
    // Firma
    company: "",
    uid: "",
    hrRegister: "ja",
    street: "",
    postcode: "",
    city: "",
    poBox: "",
    poPostcode: "",
    contactName: "",
    contactRole: "",
    contactPhone: "",
    contactEmail: "",

    // Intrum Ansprechperson
    intrumName: "",
    intrumEmail: "",
    intrumPhone: "",

    // Produkte (Fixpreise)
    ees: 0.80,
    fes: 1.50,
    qes: 2.20,

    // SIGN Optionen
    signUsers: "",
    whiteLabeling: false,

    // seal.ID
    sealIdVolume: "",
    sealIdPrice: null,

    // Gültigkeit
    validUntil: "",
  });

  // -----------------------------------
  // ✅ Gültigkeit automatisch +30 Tage
  // -----------------------------------
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    const formatted = date.toISOString().split("T")[0];
    setOfferData((prev) => ({ ...prev, validUntil: formatted }));
  }, []);

  // -----------------------------------
  // ✅ GENERISCHES FORM-HANDLING
  // -----------------------------------
  const updateField = (field, value) => {
    setOfferData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // -----------------------------------
  // ✅ FORMULAR LAYOUT START
  // -----------------------------------
  return (
    <div className="container mx-auto p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-intrumPurple mb-6">
        Offerte erstellen
      </h1>


      {/* -----------------------------------
          ✅ FIRMA — KUNDENDATEN
      ----------------------------------- */}
      <div className="card-tile mb-8">
        <h2 className="text-xl font-semibold text-intrumPurple mb-4">
          Angaben zur Firma
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium mb-1">Firmenname</label>
            <input
              type="text"
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.company}
              onChange={(e) => updateField("company", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">UID</label>
            <input
              type="text"
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.uid}
              onChange={(e) => updateField("uid", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Handelsregistereintrag
            </label>
            <select
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.hrRegister}
              onChange={(e) => updateField("hrRegister", e.target.value)}
            >
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Strasse / Hausnummer
            </label>
            <input
              type="text"
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.street}
              onChange={(e) => updateField("street", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              PLZ / Ort
            </label>
            <input
              type="text"
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.postcode}
              onChange={(e) => updateField("postcode", e.target.value)}
              placeholder="PLZ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">&nbsp;</label>
            <input
              type="text"
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="Ort"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Postfach</label>
            <input
              type="text"
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.poBox}
              onChange={(e) => updateField("poBox", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              PLZ / Ort (Postfach)
            </label>
            <input
              type="text"
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.poPostcode}
              onChange={(e) => updateField("poPostcode", e.target.value)}
              placeholder="PLZ / Ort (Postfach)"
            />
          </div>

        </div>
      </div>


      {/* -----------------------------------
          ✅ KONTAKTPERSON
      ----------------------------------- */}
      <div className="card-tile mb-8">
        <h2 className="text-xl font-semibold text-intrumPurple mb-4">
          Kontaktperson
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.contactName}
              onChange={(e) => updateField("contactName", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Funktion / Abteilung
            </label>
            <input
              type="text"
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.contactRole}
              onChange={(e) => updateField("contactRole", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Telefon / Mobile</label>
            <input
              type="text"
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.contactPhone}
              onChange={(e) => updateField("contactPhone", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">E-Mail</label>
            <input
              type="email"
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.contactEmail}
              onChange={(e) => updateField("contactEmail", e.target.value)}
            />
          </div>

        </div>
      </div>


      {/* -----------------------------------
          ✅ INTRUM ANSPRECHPERSON
      ----------------------------------- */}
      <div className="card-tile mb-8">
        <h2 className="text-xl font-semibold text-intrumPurple mb-4">
          Ihre Ansprechperson bei Intrum
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.intrumName}
              onChange={(e) => updateField("intrumName", e.target.value)}
              placeholder="z. B. Elfat Rusiti"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">E-Mail</label>
            <input
              type="email"
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.intrumEmail}
              onChange={(e) => updateField("intrumEmail", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Telefon</label>
            <input
              type="text"
              className="input-focus w-full p-3 border rounded-lg"
              value={offerData.intrumPhone}
              onChange={(e) => updateField("intrumPhone", e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* --- PART 1 ENDE --- */}
	  {/* -----------------------------------
          ✅ PRODUKT-MODULE – SIGN / EES / FES / QES
      ----------------------------------- */}
      <div className="card-tile mb-8">
        <h2 className="text-xl font-semibold text-intrumPurple mb-4">
          Produkte & Module
        </h2>

        {/* SIGN — Pflichtfeld */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Anzahl SIGN Benutzer (pro Monat) *
          </label>
          <input
            type="number"
            min="1"
            className="input-focus w-full p-3 border rounded-lg"
            value={offerData.signUsers}
            onChange={(e) => updateField("signUsers", e.target.value)}
            placeholder="z. B. 10"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Preis pro Benutzer: 9.00 CHF / Monat
          </p>
        </div>

        {/* Fixpreise anzeigen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
            <h4 className="font-semibold mb-1">EES – Einfache Signatur</h4>
            <p className="text-gray-700">Preis: {offerData.ees.toFixed(2)} CHF</p>
          </div>

          <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
            <h4 className="font-semibold mb-1">FES – Fortgeschrittene Signatur</h4>
            <p className="text-gray-700">Preis: {offerData.fes.toFixed(2)} CHF</p>
          </div>

          <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
            <h4 className="font-semibold mb-1">QES – Qualifizierte Signatur</h4>
            <p className="text-gray-700">Preis: {offerData.qes.toFixed(2)} CHF</p>
          </div>
        </div>

        {/* seal.ID Staffelpreis */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            seal.ID – Volumen pro Jahr
          </label>

          <input
            type="number"
            min="0"
            className="input-focus w-full p-3 border rounded-lg"
            value={offerData.sealIdVolume}
            onChange={(e) => {
              const volume = Number(e.target.value);
              let price = null;

              if (volume === 0) price = null;
              else if (volume <= 2500) price = 28.20;
              else if (volume <= 5000) price = 26.20;
              else if (volume <= 10000) price = 24.20;
              else price = "Nach Vereinbarung";

              setOfferData((prev) => ({
                ...prev,
                sealIdVolume: volume,
                sealIdPrice: price,
              }));
            }}
            placeholder="z. B. 3000"
          />

          {/* Anzeige der ermittelten Preisstufe */}
          {offerData.sealIdPrice !== null && (
            <p className="mt-2 text-gray-700">
              Preis pro Identifikation:{" "}
              <strong>
                {offerData.sealIdPrice === "Nach Vereinbarung"
                  ? "Nach Vereinbarung"
                  : `${offerData.sealIdPrice} CHF`}
              </strong>
            </p>
          )}
        </div>

        {/* White Labeling */}
        <div className="flex items-center gap-3 mt-4">
          <input
            id="whiteLabeling"
            type="checkbox"
            checked={offerData.whiteLabeling}
            onChange={(e) =>
              setOfferData((prev) => ({
                ...prev,
                whiteLabeling: e.target.checked,
              }))
            }
            className="h-5 w-5"
          />
          <label htmlFor="whiteLabeling" className="text-sm">
            White Labeling – einmalig 2’500.00 CHF
          </label>
        </div>
      </div>
	  {/* -----------------------------------
          ✅ GÜLTIGKEIT DES ANGEBOTS
      ----------------------------------- */}
      <div className="card-tile mb-8">
        <h2 className="text-xl font-semibold text-intrumPurple mb-4">
          Gültigkeit des Angebots
        </h2>

        <label className="block text-sm font-medium mb-1">
          Gültig bis
        </label>

        <input
          type="date"
          className="input-focus w-full p-3 border rounded-lg"
          value={offerData.validUntil}
          onChange={(e) => updateField("validUntil", e.target.value)}
        />

        <p className="text-xs text-gray-500 mt-2">
          Standard: Heute + 30 Tage. Du kannst das Datum manuell anpassen.
        </p>
      </div>

      {/* -----------------------------------
          ✅ PDF GENERIEREN BUTTON
      ----------------------------------- */}
      <div className="mt-10 mb-20">
        <button
          onClick={() => {
            // später ersetzen wir diesen Call durch den echten PDF-Generator
            import("../utils/offerPdf").then((mod) => {
              mod.exportOfferPDF(offerData);
            });
          }}
          className="btn-primary w-full py-4 text-lg"
        >
          Offerte als PDF generieren
        </button>
      </div>

    </div> 
    // container end
  );
} // END COMPONENT
``