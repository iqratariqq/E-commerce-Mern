// VendorPendingApproval.jsx
// Requires tailwind.config.js to include the custom colors listed below:
//
//  pupkin_spice / pumpkin: "#EF6F1A"
//  pumpkinDark: "#c45a10"
//  pumpkinLight: "#f4924d"
//  khakhi_beige / beige: "#bca79d"
//  off_white / offWhite: "#ffe9d0"
//  toupe / taupe: "#54433a"
//  taupeDark: "#3a2e28"
//  taupeDeep: "#1e1510"

import { useEffect, useState } from "react";

const steps = [
  {
    id: 1,
    icon: "✓",
    label: "Application Submitted",
    description: "Your vendor profile and documents have been received.",
    status: "done",
  },
  {
    id: 2,
    icon: "👁",
    label: "Admin Review",
    description:
      "Our team is verifying your kitchen license, documents, and compliance details.",
    status: "active",
  },
  {
    id: 3,
    icon: "✉",
    label: "Approval Notification",
    description:
      "You'll receive an email once approved or if more info is needed.",
    status: "upcoming",
  },
  {
    id: 4,
    icon: "🚀",
    label: "Account Activated",
    description:
      "Start listing your meals, manage orders, and grow your cloud kitchen.",
    status: "upcoming",
  },
];

function StepIcon({ status, children }) {
  if (status === "done") {
    return (
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-pumpkin flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );
  }
  if (status === "active") {
    return (
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-pumpkin flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-beige/20 border-2 border-dashed border-beige flex items-center justify-center">
      <span className="text-beige text-sm">{children}</span>
    </div>
  );
}

export default function VendorPendingApproval() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-offWhite font-serif">

      {/* Navbar */}
      <nav className="bg-taupeDeep h-[60px] px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-pumpkin rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-offWhite text-[17px] font-semibold tracking-wide">
            CloudKitchen
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-beige text-[13px] font-sans">Pending Review</span>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-[680px] mx-auto px-6 py-12">

        {/* Status Hero */}
        <div
          className={`text-center mb-8 transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Pulsing icon */}
          <div className="relative w-24 h-24 mx-auto mb-5">
            <div className="absolute inset-[-8px] rounded-full border-2 border-pumpkin opacity-30 animate-ping" />
            <div className="w-24 h-24 rounded-full bg-pumpkin/10 border-2 border-pumpkin flex items-center justify-center">
              <svg className="w-10 h-10 text-pumpkin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
              </svg>
            </div>
          </div>

          {/* Awaiting badge */}
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-300 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:300ms]" />
            <span className="text-xs font-semibold text-amber-800 tracking-widest uppercase font-sans">
              Awaiting Approval
            </span>
          </div>

          <h1 className="text-[28px] font-bold text-taupeDeep mb-2 leading-snug">
            Your application is under review
          </h1>
          <p className="text-[15px] text-taupe leading-relaxed font-sans max-w-md mx-auto">
            Thank you for signing up. Our team is carefully reviewing your
            details and will activate your account shortly.
          </p>
        </div>

        {/* Progress Timeline */}
        <div
          className={`bg-white rounded-2xl border border-beige/30 p-7 mb-4 transition-all duration-500 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-[11px] tracking-widest uppercase text-beige font-semibold font-sans mb-5">
            Application Progress
          </p>

          <div className="flex flex-col gap-0">
            {steps.map((step, idx) => (
              <div key={step.id}>
                {/* Step row */}
                <div
                  className={`flex items-start gap-3.5 ${
                    step.status === "active"
                      ? "bg-pumpkin/[0.07] border-l-2  border-pumpkin rounded-xl px-3.5 py-3 -mx-3.5"
                      : "py-2"
                  } ${step.status === "upcoming" ? "opacity-45" : ""}`}
                >
                  <StepIcon status={step.status}>

                    {step.icon}
                    </StepIcon>
                  <div className="flex-1 pt-1">
                    <p className="text-[14px] font-semibold text-taupeDeep mb-0.5 font-sans">
                      {step.label}
                    </p>
                    <p className="text-[13px] text-taupe leading-snug font-sans">
                      {step.description}
                    </p>
                  </div>
                  {step.status === "done" && (
                    <span className="text-xs text-pumpkin font-semibold font-sans pt-1 flex-shrink-0">
                      Done
                    </span>
                  )}
                  {step.status === "active" && (
                    <span className="text-[11px] bg-amber-100 text-amber-800 font-semibold font-sans px-2.5 py-1 rounded-full flex-shrink-0">
                      In Progress
                    </span>
                  )}
                </div>

                {/* Connector */}
                {idx < steps.length - 1 && (
                  <div
                    className={`ml-[17px] w-0.5 h-6 ${
                      step.status === "done"
                        ? "bg-gradient-to-b from-pumpkin/30 to-amber-100"
                        : "bg-beige/25"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div
          className={`grid grid-cols-2 gap-3 mb-4 transition-all duration-500 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-white rounded-2xl border border-beige/30 p-5">
            <div className="w-9 h-9 rounded-xl bg-pumpkin/10 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-pumpkin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-[13px] font-semibold text-taupeDeep mb-1 font-sans">
              Review Timeline
            </p>
            <p className="text-[13px] text-taupe leading-snug font-sans">
              Applications are typically reviewed within{" "}
              <strong className="text-taupeDeep">1–3 business days</strong>.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-beige/30 p-5">
            <div className="w-9 h-9 rounded-xl bg-pumpkin/10 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-pumpkin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[13px] font-semibold text-taupeDeep mb-1 font-sans">
              Keep Documents Ready
            </p>
            <p className="text-[13px] text-taupe leading-snug font-sans">
              Admin may request additional verification documents via email.
            </p>
          </div>
        </div>

        {/* Support Banner */}
        <div
          className={`bg-taupeDeep rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap transition-all duration-500 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div>
            <p className="text-offWhite text-[15px] font-semibold mb-1 font-sans">
              Have questions?
            </p>
            <p className="text-beige text-[13px] font-sans">
              Vendor support is available Mon–Sat, 9am–6pm
            </p>
          </div>
          <a
            href="mailto:support@cloudkitchen.com"
            className="flex-shrink-0 flex items-center gap-2 bg-pumpkin hover:bg-pumpkinDark text-white text-[13px] font-semibold font-sans px-5 py-2.5 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Contact Support
          </a>
        </div>

        {/* Footer note */}
        <p className="text-center text-[12px] text-beige mt-6 font-sans">
          Logged in as{" "}
          <strong className="text-taupe">vendor@example.com</strong> ·{" "}
          <button className="text-pumpkin hover:underline bg-transparent border-none cursor-pointer font-sans">
            Sign out
          </button>
        </p>
      </div>
    </div>
  );
}