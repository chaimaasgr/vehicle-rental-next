export function AvailabilityBadge({ available }: { available: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        available
          ? "bg-route-500/10 text-route-600"
          : "bg-asphalt-700/10 text-asphalt-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          available ? "bg-route-500" : "bg-asphalt-500"
        }`}
      />
      {available ? "Disponible" : "Indisponible"}
    </span>
  );
}
