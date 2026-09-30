import React from 'react';

export const HeroGridSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 1200 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <pattern id="hero-pattern-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6366f1" strokeWidth="0.75" strokeOpacity="0.12" />
        <circle cx="0" cy="0" r="1.5" fill="#4f46e5" fillOpacity="0.25" />
      </pattern>
      <linearGradient id="grid-fade-mask" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#6366f1" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#hero-pattern-grid)" />
    {/* Geometric accent lines */}
    <path
      d="M 100 200 C 300 120, 500 280, 800 160 S 1100 320, 1200 240"
      stroke="url(#grid-fade-mask)"
      strokeWidth="2"
      strokeDasharray="6 6"
      fill="none"
    />
    <path
      d="M 50 450 C 350 350, 650 500, 950 380 S 1150 420, 1250 350"
      stroke="url(#grid-fade-mask)"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

export const VerifiedShieldSvg: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L4 5.5V11C4 16.5 7.5 21.3 12 22C16.5 21.3 20 16.5 20 11V5.5L12 2Z"
      fill="#EEF2FF"
      stroke="#4F46E5"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 11.5L11 14L15.5 9.5"
      stroke="#4F46E5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PricingSparkleSvg: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
    <path
      d="M12 2L14.2 8.8L21 11L14.2 13.2L12 20L9.8 13.2L3 11L9.8 8.8L12 2Z"
      fill="url(#sparkle-grad)"
      fillOpacity="0.2"
      stroke="url(#sparkle-grad)"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <circle cx="18" cy="5" r="1.5" fill="#4F46E5" />
    <circle cx="6" cy="18" r="1" fill="#06B6D4" />
  </svg>
);

export const TechConnectorWire: React.FC<{ className?: string }> = ({ className = 'w-24 h-12' }) => (
  <svg
    viewBox="0 0 100 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M0 20 C 30 20, 40 5, 70 5 H 100"
      stroke="#6366F1"
      strokeWidth="1.5"
      strokeDasharray="3 3"
      strokeOpacity="0.4"
    />
    <circle cx="0" cy="20" r="3" fill="#4F46E5" />
    <circle cx="100" cy="5" r="3" fill="#06B6D4" />
  </svg>
);

export const IsometricCubeSvg: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L20 6.5V17.5L12 22L4 17.5V6.5L12 2Z"
      fill="#F1F5F9"
      stroke="#475569"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M12 2V12M12 12L20 6.5M12 12L4 6.5"
      stroke="#475569"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M12 12V22"
      stroke="#475569"
      strokeWidth="1.5"
    />
  </svg>
);
