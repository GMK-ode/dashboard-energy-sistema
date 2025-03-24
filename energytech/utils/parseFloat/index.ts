export function cleanAndParseNumber(value: string): number {
  // Remove currency symbols, thousands separators, and percentage signs
  const cleanedValue = value
    .replace(/[^0-9,-]/g, "") // Remove all non-numeric characters except commas and hyphens
    .replace(",", "."); // Replace comma with dot for decimal parsing

  // Parse the cleaned value into a number
  return parseFloat(cleanedValue);
}