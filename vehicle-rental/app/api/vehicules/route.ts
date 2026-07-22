import { NextRequest, NextResponse } from "next/server";
import { dataProvider } from "@/lib/data-provider";
import type { Category, Transmission } from "@/types";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const category = params.get("category") as Category | "toutes" | null;
  const transmission = params.get("transmission") as
    | Transmission
    | "toutes"
    | null;
  const seatsParam = params.get("seats");
  const maxPriceParam = params.get("maxPrice");
  const availableOnly = params.get("availableOnly") === "true";

  const vehicles = await dataProvider.getVehicles({
    category: category ?? undefined,
    transmission: transmission ?? undefined,
    seats: seatsParam ? Number(seatsParam) : undefined,
    maxPrice: maxPriceParam ? Number(maxPriceParam) : undefined,
    availableOnly,
  });

  return NextResponse.json({ data: vehicles });
}
