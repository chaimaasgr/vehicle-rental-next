export type Category = "economique" | "suv" | "utilitaire" | "premium";
export type Transmission = "manuelle" | "automatique";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  category: Category;
  pricePerDay: number;
  seats: number;
  transmission: Transmission;
  available: boolean;
  images: string[];
  description: string;
  features: string[];
  featured?: boolean;
}

export interface RentalOption {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  icon: string;
}

export interface Customer {
  fullName: string;
  email: string;
  phone: string;
}

export interface ReservationInput {
  vehicleId: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  optionIds: string[];
  customer: Customer;
}

export interface Reservation extends ReservationInput {
  id: string;
  reservationNumber: string;
  days: number;
  vehiclePrice: number;
  optionsPrice: number;
  total: number;
  createdAt: string;
}

export interface VehicleFilters {
  category?: Category | "toutes";
  transmission?: Transmission | "toutes";
  seats?: number;
  maxPrice?: number;
  availableOnly?: boolean;
}
