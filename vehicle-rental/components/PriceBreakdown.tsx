import { formatPrice } from "@/lib/pricing";

interface PriceBreakdownProps {
  days: number;
  pricePerDay: number;
  vehiclePrice: number;
  optionsPrice: number;
  total: number;
  optionLines: { name: string; pricePerDay: number }[];
}

export function PriceBreakdown({
  days,
  pricePerDay,
  vehiclePrice,
  optionsPrice,
  total,
  optionLines,
}: PriceBreakdownProps) {
  return (
    <div className="rounded-xl2 border border-asphalt-700/10 bg-white p-6 shadow-card">
      <h2 className="font-display text-lg font-semibold text-asphalt-900">
        Récapitulatif du prix
      </h2>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between text-asphalt-600">
          <dt>
            Véhicule ({formatPrice(pricePerDay)} × {days} jour
            {days > 1 ? "s" : ""})
          </dt>
          <dd className="font-medium text-asphalt-900">
            {formatPrice(vehiclePrice)}
          </dd>
        </div>

        {optionLines.map((o) => (
          <div key={o.name} className="flex justify-between text-asphalt-600">
            <dt>
              {o.name} ({formatPrice(o.pricePerDay)} × {days} jour
              {days > 1 ? "s" : ""})
            </dt>
            <dd className="font-medium text-asphalt-900">
              {formatPrice(o.pricePerDay * days)}
            </dd>
          </div>
        ))}

        {optionLines.length > 0 && (
          <div className="flex justify-between border-t border-asphalt-700/10 pt-2 text-asphalt-600">
            <dt>Total options</dt>
            <dd className="font-medium text-asphalt-900">
              {formatPrice(optionsPrice)}
            </dd>
          </div>
        )}
      </dl>

      <div className="route-line my-4" />

      <div className="flex items-end justify-between">
        <span className="font-display text-sm font-semibold uppercase tracking-wide text-asphalt-500">
          Total
        </span>
        <span className="font-display text-2xl font-bold text-asphalt-900">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}
