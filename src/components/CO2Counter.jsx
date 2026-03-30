import React, { useEffect, useState } from "react";

export default function CO2Counter({ data, t }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setDisplay(data.co2Saved * (step / 20));
      if (step >= 20) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="card-tile fade-section">
      <h4 className="section-headline">{t.co2Counter.title}</h4>

      <p className="text-3xl font-extrabold text-gray-900">
        {display.toFixed(2)} kg
      </p>

      <p className="text-gray-600 text-sm">
        {t.co2Counter.subtitle}
      </p>
    </div>
  );
}