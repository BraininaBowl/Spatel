export default function (string) {
  return encodeURIComponent(string.trim().toLowerCase().replace(/\s+/g, "-"));
}