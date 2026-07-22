// Fonctions de calcul de prix, partagées entre le client (aperçu en direct
// dans le formulaire de réservation) et le serveur (calcul faisant foi,
// exécuté à nouveau côté API pour ne jamais faire confiance au client).

export function computeDays(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 0;
  const msPerDay = 1000 * 60 * 60 * 24;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.round((end.getTime() - start.getTime()) / msPerDay);
  return Math.max(0, diff);
}

export function computeVehiclePrice(
  pricePerDay: number,
  days: number
): number {
  return pricePerDay * Math.max(days, 0);
}

export function computeOptionsPrice(
  optionsPricePerDay: number,
  days: number
): number {
  return optionsPricePerDay * Math.max(days, 0);
}

export function formatPrice(amount: number): string {
  const formattedNumber = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formattedNumber} DH`;
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
