"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { RentalOption, Vehicle } from "@/types";
import { createReservation } from "@/lib/client-api";
import { computeDays, computeOptionsPrice, computeVehiclePrice } from "@/lib/pricing";
import { PriceBreakdown } from "@/components/PriceBreakdown";
import { OPTION_ICONS, IconShield } from "@/components/icons";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function tomorrowIso() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function ReservationForm({
  vehicle,
  options,
}: {
  vehicle: Vehicle;
  options: RentalOption[];
}) {
  const router = useRouter();

  const [startDate, setStartDate] = useState(todayIso());
  const [endDate, setEndDate] = useState(tomorrowIso());
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const days = Math.max(1, computeDays(startDate, endDate));
  const selectedOptions = options.filter((o) =>
    selectedOptionIds.includes(o.id)
  );
  const vehiclePrice = computeVehiclePrice(vehicle.pricePerDay, days);
  const optionsPrice = computeOptionsPrice(
    selectedOptions.reduce((sum, o) => sum + o.pricePerDay, 0),
    days
  );
  const total = vehiclePrice + optionsPrice;

  const optionLines = useMemo(
    () => selectedOptions.map((o) => ({ name: o.name, pricePerDay: o.pricePerDay })),
    [selectedOptions]
  );

  function toggleOption(id: string) {
    setSelectedOptionIds((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (new Date(endDate) < new Date(startDate)) {
      setError("La date de fin doit être postérieure à la date de début.");
      return;
    }
    if (!fullName || !email || !phone) {
      setError("Merci de renseigner toutes vos informations.");
      return;
    }

    setSubmitting(true);
    try {
      const reservation = await createReservation({
        vehicleId: vehicle.id,
        startDate,
        endDate,
        optionIds: selectedOptionIds,
        customer: { fullName, email, phone },
      });
      router.push(`/confirmation/${reservation.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr,360px]">
      <div className="space-y-8">
        <fieldset className="rounded-xl2 border border-asphalt-700/10 bg-white p-6 shadow-card">
          <legend className="font-display text-lg font-semibold text-asphalt-900">
            Dates de location
          </legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="startDate"
                className="text-xs font-semibold uppercase tracking-wide text-asphalt-500"
              >
                Date de début
              </label>
              <input
                id="startDate"
                type="date"
                required
                value={startDate}
                min={todayIso()}
                onChange={(e) => setStartDate(e.target.value)}
                className="focus-ring mt-2 w-full rounded-lg border border-asphalt-700/15 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="text-xs font-semibold uppercase tracking-wide text-asphalt-500"
              >
                Date de fin
              </label>
              <input
                id="endDate"
                type="date"
                required
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="focus-ring mt-2 w-full rounded-lg border border-asphalt-700/15 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-xl2 border border-asphalt-700/10 bg-white p-6 shadow-card">
          <legend className="font-display text-lg font-semibold text-asphalt-900">
            Options supplémentaires
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {options.map((opt) => {
              const Icon = OPTION_ICONS[opt.icon] ?? IconShield;
              const checked = selectedOptionIds.includes(opt.id);
              return (
                <label
                  key={opt.id}
                  className={`focus-ring flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                    checked
                      ? "border-signal-500 bg-signal-500/5"
                      : "border-asphalt-700/10 hover:border-asphalt-700/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleOption(opt.id)}
                    className="mt-1 h-4 w-4 accent-signal-500"
                  />
                  <span>
                    <span className="flex items-center gap-2 text-sm font-semibold text-asphalt-900">
                      <Icon className="h-4 w-4 text-signal-600" />
                      {opt.name}
                    </span>
                    <span className="mt-1 block text-xs text-asphalt-500">
                      {opt.description}
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-asphalt-700">
                      +{opt.pricePerDay} € / jour
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="rounded-xl2 border border-asphalt-700/10 bg-white p-6 shadow-card">
          <legend className="font-display text-lg font-semibold text-asphalt-900">
            Vos informations
          </legend>
          <div className="mt-4 grid gap-4">
            <div>
              <label
                htmlFor="fullName"
                className="text-xs font-semibold uppercase tracking-wide text-asphalt-500"
              >
                Nom complet
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jean Dupont"
                className="focus-ring mt-2 w-full rounded-lg border border-asphalt-700/15 px-3 py-2 text-sm"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wide text-asphalt-500"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean.dupont@email.com"
                  className="focus-ring mt-2 w-full rounded-lg border border-asphalt-700/15 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="text-xs font-semibold uppercase tracking-wide text-asphalt-500"
                >
                  Téléphone
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="06 12 34 56 78"
                  className="focus-ring mt-2 w-full rounded-lg border border-asphalt-700/15 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </fieldset>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}
      </div>

      <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <PriceBreakdown
          days={days}
          pricePerDay={vehicle.pricePerDay}
          vehiclePrice={vehiclePrice}
          optionsPrice={optionsPrice}
          total={total}
          optionLines={optionLines}
        />
        <button
          type="submit"
          disabled={submitting}
          className="focus-ring w-full rounded-full bg-asphalt-950 px-6 py-3.5 text-sm font-semibold text-mist-50 transition hover:bg-signal-500 hover:text-asphalt-950 disabled:opacity-60"
        >
          {submitting ? "Validation en cours…" : "Confirmer la réservation"}
        </button>
      </div>
    </form>
  );
}
