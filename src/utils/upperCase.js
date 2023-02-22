export const upperCase = (string) => {
  const firstLetter = string.charAt(0).toUpperCase();
  const restOfString = string.slice(1);
  const upperCasedString = firstLetter + restOfString;
  return upperCasedString;
};
