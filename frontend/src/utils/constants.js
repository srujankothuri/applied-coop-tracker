// Must match APPLICATION_STATUSES in backend/config/constants.js.
export const APPLICATION_STATUSES = [
  "Applied",
  "Interviewing",
  "Offer",
  "Rejected",
];

export function formatDate(value) {
  // Dates like "2026-10-03" are parsed as UTC; keep them in UTC so the
  // displayed day does not shift by timezone.
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
