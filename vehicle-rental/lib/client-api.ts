// Fonctions d'appel à l'API mock depuis des composants client.
// Elles ciblent les routes /api/* et pourront, à terme, cibler directement
// les endpoints Atracio si l'on choisit de ne plus passer par les routes
// Next.js internes.

import type {
  Vehicle,
  RentalOption,
  Reservation,
  ReservationInput,
  VehicleFilters,
} from "@/types";

async function handle<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error ?? "Une erreur est survenue.");
  }
  return json.data as T;
}

export function buildVehicleQuery(filters: VehicleFilters): string {
  const params = new URLSearchParams();
  if (filters.category && filters.category !== "toutes")
    params.set("category", filters.category);
  if (filters.transmission && filters.transmission !== "toutes")
    params.set("transmission", filters.transmission);
  if (filters.seats) params.set("seats", String(filters.seats));
  if (filters.maxPrice) params.set("maxPrice", String(filters.maxPrice));
  if (filters.availableOnly) params.set("availableOnly", "true");
  return params.toString();
}

export async function fetchVehicles(
  filters: VehicleFilters = {}
): Promise<Vehicle[]> {
  const qs = buildVehicleQuery(filters);
  const res = await fetch(`/api/vehicules${qs ? `?${qs}` : ""}`);
  return handle<Vehicle[]>(res);
}

export async function fetchOptions(): Promise<RentalOption[]> {
  const res = await fetch("/api/options");
  return handle<RentalOption[]>(res);
}

export async function createReservation(
  input: ReservationInput
): Promise<Reservation> {
  const res = await fetch("/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handle<Reservation>(res);
}

export async function fetchReservation(id: string): Promise<Reservation> {
  const res = await fetch(`/api/reservations/${id}`);
  return handle<Reservation>(res);
}
