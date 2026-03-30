import React, { useState, useEffect, useMemo } from "react";
import {
  FaFileAlt,
  FaPenFancy,
  FaClock,
  FaMoneyBillWave,
  FaLeaf
} from "react-icons/fa";

function KPISectionBase({ data, t }) {
  const [display, setDisplay] = useState({ ...data });
  const [openCard, setOpenCard] = useState(null);

  useEffect(() => {
    let step = 0;
    const fade = setInterval(() => {
      step++;
      if (step > 20) clearInterval(fade);
      setDisplay({
        totalHand: data.totalHand * (step / 20),
        totalDigital: data.totalDigital * (step / 20),
        timeSaved: data.timeSaved * (step / 20),
        moneySaved: data.moneySaved * (step / 20),
        co2Saved: data.co2Saved * (step / 20),
      });
    }, 40);

    return () => clearInterval(fade);
  }, [data]);

  const cards = useMemo(() => [
    {
      key: "totalHand",
      label: t.kpi.handwritten,
      value: display.totalHand.toFixed(2) + " CHF",
      icon: <FaFileAlt size={26} />,
      description: t.kpi.handwrittenDesc,
    },
    {
      key: "totalDigital",
      label: t.kpi.digital,
      value: display.totalDigital.toFixed(2) + " CHF",
      icon: <FaPenFancy size={26} />,
      description: t.kpi.digitalDesc,
    },
    {
      key: "timeSaved",
      label: t.kpi.timeSaved,
      value: display.timeSaved.toFixed(2) + " h",
      icon: <FaClock size={26} />,
      description: t.kpi.timeSavedDesc,
    },
    {
      key: "moneySaved",
      label: t.kpi.moneySaved,
      value: display.moneySaved.toFixed(2) + " CHF",
      icon: <FaMoneyBillWave size={26} />,
      description: t.kpi.moneySavedDesc,
    },
    {
      key: "co2Saved",
      label: t.kpi.co2Saved,
      value: display.co2Saved.toFixed(2) + " kg",
      icon: <FaLeaf size={26} />,
      description: t.kpi.co2SavedDesc,
    }
  ], [display, t]);

  return (
    <div id="kpi-section" className="grid grid-cols-1 gap-4 fade-section">
      {cards.map((c, i) => (
        <div
          key={i}
          className="card-tile card-hover cursor-pointer"
          onClick={() => setOpenCard(openCard === c.key ? null : c.key)}
        >
          <div className="flex items-center gap-3 mb-1">
            {React.cloneElement(c.icon, { className: "text-intrumPurple opacity-90" })}
            <span className="font-semibold text-gray-800">{c.label}</span>
          </div>

          <p className="text-2xl font-extrabold text-gray-900">{c.value}</p>

          {openCard === c.key && (
            <p className="mt-3 text-sm text-gray-600 border-t pt-3">{c.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default React.memo(KPISectionBase);