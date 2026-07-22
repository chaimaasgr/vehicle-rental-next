import { NextResponse } from "next/server";
import { dataProvider } from "@/lib/data-provider";

export async function GET() {
  const options = await dataProvider.getOptions();
  return NextResponse.json({ data: options });
}
