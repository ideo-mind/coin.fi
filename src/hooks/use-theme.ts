import { useEffect } from 'react';
export function useTheme() {
  // Landing page is hardcoded to dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  return { isDark: true, toggleTheme: () => {} };
}