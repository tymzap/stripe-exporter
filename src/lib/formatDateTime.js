export function formatDateTime(date) {
  return `${date.toLocaleDateString(LOCALE)} ${date.toLocaleTimeString(LOCALE)}`;
}

const LOCALE = "pl-PL";
