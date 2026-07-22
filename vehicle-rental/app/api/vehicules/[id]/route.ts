import { NextResponse } from "next/server";
import { dataProvider } from "@/lib/data-provider";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const vehicle = await dataProvider.getVehicleById(params.id);

  if (!vehicle) {
    return NextResponse.json(
      { error: "Véhicule introuvable" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: vehicle });
}
