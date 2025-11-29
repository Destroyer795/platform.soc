'use client';
import { createContext, useContext } from 'react';

const theme = process.env.NEXT_PUBLIC_THEME || 'SUMMER';

const ThemeContext = createContext({
  theme,
  classes: {
    cardBg: theme === 'SUMMER' ? 'bg-white/40' : 'bg-blue-200/40',
    cardBorder: theme === 'SUMMER' ? 'border-white/20' : 'border-blue-200/20',
    cardTitle: theme === 'SUMMER' ? 'text-gray-800' : 'text-white',
    cardText: theme === 'SUMMER' ? 'text-gray-700' : 'text-white/90',
    cardHover:
      theme === 'SUMMER' ? 'hover:bg-white/50' : 'hover:bg-blue-200/50',

    pageTitle: theme === 'SUMMER' ? 'text-white' : 'text-blue',
    pageDesc: theme === 'SUMMER' ? 'text-white/70' : 'text-blue-100',

    chipBg: theme === 'SUMMER' ? 'bg-slate-700' : 'bg-blue-100/30',
    chipText: theme === 'SUMMER' ? 'text-white' : 'text-blue-200',
    chipHoverBg: theme === 'SUMMER' ? 'bg-slate-800' : 'bg-blue-100/50',
    selectedChipBg: theme === 'SUMMER' ? 'bg-gray-50' : 'bg-blue-200/40',
    selectedChipText: theme === 'SUMMER' ? 'text-gray-900' : 'text-white',
    selectedChipHoverBg: theme === 'SUMMER' ? 'bg-gray-100' : 'bg-blue-200/60',
    selectedChipBorder:
      theme === 'SUMMER' ? 'border-gray-300' : 'border-white/20',

    resourceCardBg: theme === 'SUMMER' ? 'bg-[#000000]/50' : 'bg-purple-200/30',
    resourceCardTitle: theme === 'SUMMER' ? 'text-white' : 'text-blue-900',
    resourceCardText: theme === 'SUMMER' ? 'text-gray-200' : 'text-blue-800',
    resourceCardButtonBg:
      theme === 'SUMMER' ? 'bg-[#181818]' : 'bg-blue-100/30',
    resourceCardButtonHover:
      theme === 'SUMMER' ? 'hover:bg-[#000000]/80' : 'hover:bg-blue-200/50',
  },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContext.Provider
      value={{
        theme,
        classes: {
          cardBg: theme === 'SUMMER' ? 'bg-white/40' : 'bg-blue-200/40',
          cardBorder:
            theme === 'SUMMER' ? 'border-white/20' : 'border-blue-200/20',
          cardTitle: theme === 'SUMMER' ? 'text-gray-800' : 'text-white',
          cardText: theme === 'SUMMER' ? 'text-gray-700' : 'text-white/90',
          cardHover:
            theme === 'SUMMER' ? 'hover:bg-white/50' : 'hover:bg-blue-200/50',
          pageTitle: theme === 'SUMMER' ? 'text-white' : 'text-blue',
          pageDesc: theme === 'SUMMER' ? 'text-white/70' : 'text-blue-100',
          chipBg: theme === 'SUMMER' ? 'bg-slate-700' : 'bg-blue-100/30',
          chipText: theme === 'SUMMER' ? 'text-white' : 'text-blue-200',
          chipHoverBg: theme === 'SUMMER' ? 'bg-slate-800' : 'bg-blue-100/50',
          selectedChipBg: theme === 'SUMMER' ? 'bg-gray-50' : 'bg-blue-200/40',
          selectedChipText: theme === 'SUMMER' ? 'text-gray-900' : 'text-white',
          selectedChipHoverBg:
            theme === 'SUMMER' ? 'bg-gray-100' : 'bg-blue-200/60',
          selectedChipBorder:
            theme === 'SUMMER' ? 'border-gray-300' : 'border-white/20',
          resourceCardBg:
            theme === 'SUMMER' ? 'bg-[#000000]/50' : 'bg-purple-200/30',
          resourceCardTitle:
            theme === 'SUMMER' ? 'text-white' : 'text-blue-900',
          resourceCardText:
            theme === 'SUMMER' ? 'text-gray-200' : 'text-blue-800',
          resourceCardButtonBg:
            theme === 'SUMMER' ? 'bg-[#181818]' : 'bg-blue-100/30',
          resourceCardButtonHover:
            theme === 'SUMMER'
              ? 'hover:bg-[#000000]/80'
              : 'hover:bg-blue-200/50',
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
