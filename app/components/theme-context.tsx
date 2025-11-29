'use client';
import { type ReactNode, createContext, useContext } from 'react';

type ThemeClasses = {
  cardBg: string;
  cardBorder: string;
  cardTitle: string;
  cardText: string;
  cardHover: string;
  pageTitle: string;
  pageDesc: string;
  chipBg: string;
  chipText: string;
  chipHoverBg: string;
  selectedChipBg: string;
  selectedChipText: string;
  selectedChipHoverBg: string;
  selectedChipBorder: string;
  resourceCardBg: string;
  resourceCardTitle: string;
  resourceCardText: string;
  resourceCardButtonBg: string;
  resourceCardButtonHover: string;
};

type ThemeContextType = {
  theme: string;
  classes: ThemeClasses;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = process.env.NEXT_PUBLIC_THEME || 'SUMMER';

  const classes: ThemeClasses = {
    cardBg: theme === 'SUMMER' ? 'bg-white/40' : 'bg-blue-200/40',
    cardBorder: theme === 'SUMMER' ? 'border-white/20' : 'border-blue-200/20',
    cardTitle: theme === 'SUMMER' ? 'text-gray-800' : 'text-white',
    cardText: theme === 'SUMMER' ? 'text-gray-700' : 'text-white/90',
    cardHover:
      theme === 'SUMMER' ? 'hover:bg-white/50' : 'hover:bg-blue-200/50',
    pageTitle: theme === 'SUMMER' ? 'text-white' : 'text-sky-200',
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
  };

  return (
    <ThemeContext.Provider value={{ theme, classes }}>
      {children}
    </ThemeContext.Provider>
  );
};
