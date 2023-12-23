export const capitalize = (s: string | undefined): string => {
  if (s) return s[0].toUpperCase() + s.slice(1);
  else return "";
};
