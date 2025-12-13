export const getInitials = (name) => {
  if (typeof name !== "string") return "";

  const parts = name
    .trim()
    .split(" ")
    .filter(Boolean); // empty strings hatao

  return parts
    .map(p => p[0].toUpperCase())
    .join("")
    .slice(0, 2);
};
