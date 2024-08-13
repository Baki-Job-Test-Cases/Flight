export const useLocale = () => (navigator.languages || [])[0] || navigator.language || '';
