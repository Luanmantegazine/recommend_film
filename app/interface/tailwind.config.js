import lineClamp from '@tailwindcss/line-clamp';
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    './app/interface/index.html',
    './app/interface/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: { extend: {} },
  plugins: [
    lineClamp,
    tailwindScrollbar({ nocompatible: true }),
  ],
};
