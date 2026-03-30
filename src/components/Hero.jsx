import React from "react";

export default function Hero({ t }) {
  return (
    <div className="text-center my-12 animate-fadeIn">
      <h1 className="text-4xl font-extrabold text-intrumPurple mb-3 tracking-tight hover:scale-[1.02] transition">
        {t.hero.title}
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        {t.hero.subtitle}
      </p>
    </div>
  );
}