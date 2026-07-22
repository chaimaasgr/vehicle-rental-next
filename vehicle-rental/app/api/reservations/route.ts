import { NextResponse } from "next/server";
import { dataProvider } from "@/lib/data-provider";
import type { ReservationInput } from "@/types";

function validate(input: Partial<ReservationInput>): string | null {
  if (!input.vehicleId) return "Le véhicule est obligatoire.";
  if (!input.startDate || !input.endDate)
    return "Les dates de location sont obligatoires.";
  if (new Date(input.endDate) < new Date(input.startDate))
    return "La date de fin doit être postérieure à la date de début.";
  if (!input.customer?.fullName) return "Le nom complet est obligatoire.";
  if (!input.customer?.email) return "L'email est obligatoire.";
  if (!input.customer?.phone) return "Le téléphone est obligatoire.";
  return null;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ReservationInput>;

  const error = validate(body);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const vehicle = await dataProvider.getVehicleById(body.vehicleId!);
  if (!vehicle) {
    return NextResponse.json(
      { error: "Véhicule introuvable" },
      { status: 404 }
    );
  }
  if (!vehicle.available) {
    return NextResponse.json(
      { error: "Ce véhicule n'est pas disponible à la location." },
      { status: 409 }
    );
  }

  try {
    const reservation = await dataProvider.createReservation({
      vehicleId: body.vehicleId!,
      startDate: body.startDate!,
      endDate: body.endDate!,
      optionIds: body.optionIds ?? [],
      customer: body.customer!,
    });
    return NextResponse.json({ data: reservation }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "Impossible de créer la réservation." },
      { status: 500 }
    );
  }
}
