// src/utils/codeTemplates.js
export const getFullComponentTemplate = (name, code) => {
  return \`import React from 'react';
import { motion } from 'framer-motion';

const \${name} = () => {
  return (
    \${code}
  );
};

export default \${name};\`;
};

export const tailwindConfigTemplate = \`/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
      },
    },
  },
  plugins: [],
};\`;
