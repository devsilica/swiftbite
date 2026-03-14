export function formatNaira(kobo: number) {
  return `₦${(kobo / 100).toLocaleString()}`
}