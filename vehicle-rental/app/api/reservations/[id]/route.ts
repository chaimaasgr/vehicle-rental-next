import { NextResponse } from "next/server";
import { dataProvider } from "@/lib/data-provider";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const reservation = await dataProvider.getReservationById(params.id);

  if (!reservation) {
    return NextResponse.json(
      { error: "Réservation introuvable" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: reservation });
}
