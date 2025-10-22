export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  // Split the string into words, capitalize the first letter of each word, and join them back
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
