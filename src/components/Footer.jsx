import React from "react";

export default function Footer({ t }) {
  return (
    <footer className="mt-20 py-10 text-center text-gray-700 animate-fadeIn">
      <p className="opacity-80 mb-2 text-sm">{t.footer.text}</p>

      https://www.intrum.ch/de/business-solutions/dienstleistungen/digital-onboarding/signing/
    </footer>
  );
}