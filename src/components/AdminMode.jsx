import React, { useState } from "react";

export default function AdminMode({ children, t }) {
  const [presentation, setPresentation] = useState(false);

  return (
    <div className={presentation ? "scale-[1.02] transition-transform" : ""}>

      <button
        onClick={() => setPresentation(!presentation)}
        className="fixed bottom-6 right-6 bg-intrumPurple text-white px-5 py-3 rounded-xl shadow-lg hover:bg-[#0f0340] transition z-50"
      >
        {presentation ? t.admin.normalMode : t.admin.presentationMode}
      </button>

      <div className={presentation ? "p-4 md:p-10" : ""}>
        {children}
      </div>
    </div>
  );
}