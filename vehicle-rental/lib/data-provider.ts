/**
 * Couche d'accès aux données ("data provider").
 *
 * Cette interface définit tous les accès aux données utilisés par le site.
 * L'implémentation actuelle (`mockDataProvider`) lit des fichiers JSON locaux
 * afin de simuler une API. Pour brancher les API réelles d'Atracio, il suffit
 * d'écrire une nouvelle implémentation de `DataProvider` (par exemple
 * `atracioDataProvider`, qui ferait des appels `fetch` vers les endpoints
 * Atracio) et de l'exporter à la place de `mockDataProvider` ci-dessous.
 * Aucun composant ni route de l'application n'a besoin d'être modifié.
 */

import type {
  Vehicle,
  RentalOption,
  Reservation,
  ReservationInput,
  VehicleFilters,
} from "@/types";

export interface DataProvider {
  getVehicles(filters?: VehicleFilters): Promise<Vehicle[]>;
  getVehicleById(id: string): Promise<Vehicle | null>;
  getOptions(): Promise<RentalOption[]>;
  getOptionsByIds(ids: string[]): Promise<RentalOption[]>;
  createReservation(input: ReservationInput): Promise<Reservation>;
  getReservationById(id: string): Promise<Reservation | null>;
}

// L'implémentation mock est isolée dans son propre module pour que le
// remplacement par une implémentation Atracio reste un changement local.
import { mockDataProvider } from "./mock/mock-data-provider";

export const dataProvider: DataProvider = mockDataProvider;
