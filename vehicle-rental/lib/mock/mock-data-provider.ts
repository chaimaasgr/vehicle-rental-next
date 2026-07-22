import "server-only";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import type { DataProvider } from "../data-provider";
import type {
  Vehicle,
  RentalOption,
  Reservation,
  ReservationInput,
  VehicleFilters,
} from "@/types";
import { computeDays, computeVehiclePrice, computeOptionsPrice } from "../pricing";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_DIR = path.join(process.cwd(), "data-store");
const RESERVATIONS_FILE = path.join(STORE_DIR, "reservations.json");
const PUBLIC_DIR = path.join(process.cwd(), "public");

async function readJson<T>(file: string): Promise<T> {
  const raw = await fs.readFile(file, "utf-8");
  return JSON.parse(raw) as T;
}

/**
 * Résout les images d'un véhicule : si la photo réelle attendue (placée
 * manuellement dans /public/images/vehicules/{id}/) n'existe pas encore sur
 * le disque, on retombe sur un visuel générique correspondant à la
 * catégorie du véhicule plutôt que d'afficher la photo d'un autre modèle.
 * Cela garantit qu'aucune image ne peut jamais être associée à un mauvais
 * nom de véhicule.
 */
function resolveVehicleImages(vehicle: Vehicle): Vehicle {
  const existingImages = vehicle.images.filter((imgPath) =>
    existsSync(path.join(PUBLIC_DIR, imgPath))
  );

  if (existingImages.length > 0) {
    return { ...vehicle, images: existingImages };
  }

  const placeholder = `/images/vehicules/placeholders/${vehicle.category}.svg`;
  const fallback = existsSync(path.join(PUBLIC_DIR, placeholder))
    ? placeholder
    : "/images/vehicules/placeholders/default.svg";

  return { ...vehicle, images: [fallback] };
}

async function readReservations(): Promise<Reservation[]> {
  try {
    return await readJson<Reservation[]>(RESERVATIONS_FILE);
  } catch {
    return [];
  }
}

async function writeReservations(reservations: Reservation[]): Promise<void> {
  await fs.mkdir(STORE_DIR, { recursive: true });
  await fs.writeFile(
    RESERVATIONS_FILE,
    JSON.stringify(reservations, null, 2),
    "utf-8"
  );
}

function generateReservationNumber(): string {
  const now = new Date();
  const y = now.getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `ATR-${y}-${rand}`;
}

export const mockDataProvider: DataProvider = {
  async getVehicles(filters?: VehicleFilters): Promise<Vehicle[]> {
    const rawVehicles = await readJson<Vehicle[]>(
      path.join(DATA_DIR, "vehicules.json")
    );
    const vehicles = rawVehicles.map(resolveVehicleImages);

    if (!filters) return vehicles;

    return vehicles.filter((v) => {
      if (
        filters.category &&
        filters.category !== "toutes" &&
        v.category !== filters.category
      ) {
        return false;
      }
      if (
        filters.transmission &&
        filters.transmission !== "toutes" &&
        v.transmission !== filters.transmission
      ) {
        return false;
      }
      if (filters.seats && v.seats < filters.seats) {
        return false;
      }
      if (
        typeof filters.maxPrice === "number" &&
        v.pricePerDay > filters.maxPrice
      ) {
        return false;
      }
      if (filters.availableOnly && !v.available) {
        return false;
      }
      return true;
    });
  },

  async getVehicleById(id: string): Promise<Vehicle | null> {
    const vehicles = await readJson<Vehicle[]>(
      path.join(DATA_DIR, "vehicules.json")
    );
    const vehicle = vehicles.find((v) => v.id === id) ?? null;
    return vehicle ? resolveVehicleImages(vehicle) : null;
  },

  async getOptions(): Promise<RentalOption[]> {
    return readJson<RentalOption[]>(path.join(DATA_DIR, "options.json"));
  },

  async getOptionsByIds(ids: string[]): Promise<RentalOption[]> {
    const options = await readJson<RentalOption[]>(
      path.join(DATA_DIR, "options.json")
    );
    return options.filter((o) => ids.includes(o.id));
  },

  async createReservation(input: ReservationInput): Promise<Reservation> {
    const vehicles = await readJson<Vehicle[]>(
      path.join(DATA_DIR, "vehicules.json")
    );
    const vehicle = vehicles.find((v) => v.id === input.vehicleId);
    if (!vehicle) {
      throw new Error("Véhicule introuvable");
    }

    const allOptions = await readJson<RentalOption[]>(
      path.join(DATA_DIR, "options.json")
    );
    const selectedOptions = allOptions.filter((o) =>
      input.optionIds.includes(o.id)
    );

    const days = Math.max(1, computeDays(input.startDate, input.endDate));
    const vehiclePrice = computeVehiclePrice(vehicle.pricePerDay, days);
    const optionsPrice = computeOptionsPrice(
      selectedOptions.reduce((sum, o) => sum + o.pricePerDay, 0),
      days
    );
    const total = vehiclePrice + optionsPrice;

    const reservation: Reservation = {
      ...input,
      id: crypto.randomUUID(),
      reservationNumber: generateReservationNumber(),
      days,
      vehiclePrice,
      optionsPrice,
      total,
      createdAt: new Date().toISOString(),
    };

    const reservations = await readReservations();
    reservations.push(reservation);
    await writeReservations(reservations);

    return reservation;
  },

  async getReservationById(id: string): Promise<Reservation | null> {
    const reservations = await readReservations();
    return reservations.find((r) => r.id === id) ?? null;
  },
};
