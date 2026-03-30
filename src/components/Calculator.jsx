import React from "react";

export default function Calculator({ impactData, setImpactData, t }) {
  const handleChange = (field, value) => {
    const docs = field === "docs" ? Number(value) : impactData.docs;
    const signs = field === "signs" ? Number(value) : impactData.signs;
    const pages = field === "pages" ? Number(value) : impactData.pages;

    const paperCost = docs * signs * 2.5;
    const postage = docs * signs * 2.2;
    const workHours = docs * signs * 0.5 * pages;
    const workCost = workHours * 63;
    const totalHand = paperCost + postage + workCost;

    const digitalCost = docs * signs * 2.2;
    const digitalWorkCost = docs * signs * 0.05 * 63 * pages;
    const totalDigital = digitalCost + digitalWorkCost;

    const timeSaved = workHours - docs * signs * 0.05 * pages;
    const moneySaved = totalHand - totalDigital;
    const co2Saved = docs * signs * 0.5 * pages;

    setImpactData({
      docs,
      signs,
      pages,
      totalHand,
      totalDigital,
      timeSaved,
      moneySaved,
      co2Saved,
    });
  };

  return (
    <div className="card-tile card-hover fade-section">
      <h3 className="section-headline">{t.calculator.title}</h3>

      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
        {t.calculator.subtitle}
      </p>

      <label className="block mb-4 font-medium text-gray-700 text-sm">
        {t.calculator.docs}
        <input
          type="number"
          min="0"
          placeholder="10"
          className="input-focus border border-primaryPurple p-3 rounded-lg text-center w-full bg-white shadow-sm"
          onChange={(e) => handleChange("docs", e.target.value)}
        />
      </label>

      <label className="block mb-4 font-medium text-gray-700 text-sm">
        {t.calculator.signs}
        <input
          type="number"
          min="0"
          placeholder="2"
          className="input-focus border border-primaryPurple p-3 rounded-lg text-center w-full bg-white shadow-sm"
          onChange={(e) => handleChange("signs", e.target.value)}
        />
      </label>

      <label className="block mb-4 font-medium text-gray-700 text-sm">
        {t.calculator.pages}
        <input
          type="number"
          min="1"
          placeholder="5"
          className="input-focus border border-primaryPurple p-3 rounded-lg text-center w-full bg-white shadow-sm"
          onChange={(e) => handleChange("pages", e.target.value)}
        />
      </label>
    </div>
  );
}