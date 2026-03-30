import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function LandingPage({ start, t, language, setLanguage }) {
  return (
    <div className="min-h-screen w-full bg-bgPurple20 flex flex-col justify-center items-center relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bgPurple40 opacity-60 pointer-events-none" />
      <div className="absolute w-[650px] h-[650px] bg-intrumPurple opacity-20 blur-[140px] -top-40 -left-40 animate-pulse pointer-events-none"></div>

      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
      </div>

      <div className="z-10 text-center px-6 animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-intrumPurple mb-4 leading-snug">
          {t.landing.title}
        </h1>

        <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.landing.subtitle}
        </p>

        <button
          onClick={start}
          className="btn-primary px-10 py-4 text-lg"
        >
          {t.landing.button}
        </button>
      </div>
    </div>
  );
}