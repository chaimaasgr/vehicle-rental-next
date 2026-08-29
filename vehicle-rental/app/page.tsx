import Link from "next/link";
import { dataProvider } from "@/lib/data-provider";
import { VehicleCard } from "@/components/VehicleCard";
import { IconShield, IconMapPin, IconInfinity, IconCheck } from "@/components/icons";

export default async function HomePage() {
  const vehicles = await dataProvider.getVehicles();
  const featured = vehicles.filter((v) => v.featured).slice(0, 3);
  const highlighted = featured.length > 0 ? featured : vehicles.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-asphalt-950 text-mist-50">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-signal-400">
              Location de véhicules, simplifiée
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              Prenez la route,
              <br />
              on s&apos;occupe du reste.
            </h1>
            <div className="route-line my-6 w-40" />
            <p className="max-w-md text-mist-200/80">
              Comparez un catalogue de véhicules économiques, SUV, utilitaires
              et premium, choisissez vos options, et réservez en quelques
              minutes. Prix calculé automatiquement, sans surprise.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/catalogue"
                className="focus-ring rounded-full bg-signal-500 px-7 py-3.5 text-sm font-semibold text-asphalt-950 transition hover:bg-signal-400"
              >
                Réserver maintenant
              </Link>
              <Link
                href="/catalogue"
                className="focus-ring rounded-full border border-mist-50/20 px-7 py-3.5 text-sm font-semibold text-mist-50 transition hover:border-mist-50/50"
              >
                Voir le catalogue
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-xl2 border border-mist-50/10 bg-asphalt-900/60 p-6">
              <p className="font-display text-3xl font-bold text-signal-400">
                {vehicles.length}
              </p>
              <p className="mt-1 text-sm text-mist-200/70">
                véhicules disponibles dans le catalogue de démonstration
              </p>
            </div>
            <div className="rounded-xl2 border border-mist-50/10 bg-asphalt-900/60 p-6">
              <p className="font-display text-3xl font-bold text-signal-400">4</p>
              <p className="mt-1 text-sm text-mist-200/70">catégories de véhicules</p>
            </div>
            <div className="rounded-xl2 border border-mist-50/10 bg-asphalt-900/60 p-6">
              <p className="font-display text-3xl font-bold text-signal-400">5</p>
              <p className="mt-1 text-sm text-mist-200/70">options de location</p>
            </div>
          </div>
        </div>
      </section>

      {/* Véhicules mis en avant */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-signal-600">
              Sélection
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-asphalt-900">
              Véhicules mis en avant
            </h2>
          </div>
          <Link
            href="/catalogue"
            className="focus-ring hidden rounded text-sm font-semibold text-signal-600 hover:underline md:block"
          >
            Voir tout le catalogue →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlighted.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* Avantages */}
      <section className="bg-mist-100/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-signal-600">
            Pourquoi Atracio
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-asphalt-900">
            Louer sans friction
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Advantage
              icon={<IconShield className="h-6 w-6" />}
              title="Assurance incluse en option"
              description="Ajoutez une couverture tous risques en un clic, avec un prix affiché avant validation."
            />
            <Advantage
              icon={<IconMapPin className="h-6 w-6" />}
              title="Prise en main immédiate"
              description="GPS, siège bébé, conducteur additionnel : personnalisez votre location selon vos besoins."
            />
            <Advantage
              icon={<IconInfinity className="h-6 w-6" />}
              title="Tarif total transparent"
              description="Le prix du véhicule et des options est calculé automatiquement selon la durée choisie."
            />
          </div>
        </div>
      </section>

      {/* Étapes */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-signal-600">
          Parcours
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-asphalt-900">
          Réserver en trois étapes
        </h2>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          <Step number="1" title="Choisissez votre véhicule">
            Filtrez le catalogue par catégorie, prix, transmission ou nombre
            de places.
          </Step>
          <Step number="2" title="Personnalisez votre location">
            Sélectionnez vos dates et vos options : assurance, GPS, siège
            bébé...
          </Step>
          <Step number="3" title="Confirmez votre réservation">
            Renseignez vos informations et recevez une confirmation
            immédiate.
          </Step>
        </ol>
      </section>
    </>
  );
}

function Advantage({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl2 bg-white p-6 shadow-card">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-signal-500/15 text-signal-600">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-asphalt-900">
        {title}
      </h3>
      <p className="mt-2 text-sm text-asphalt-600">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative rounded-xl2 border border-asphalt-700/10 bg-white p-6">
      <span className="font-display text-4xl font-bold text-signal-500/30">
        {number}
      </span>
      <h3 className="mt-2 font-display text-lg font-semibold text-asphalt-900">
        {title}
      </h3>
      <p className="mt-2 text-sm text-asphalt-600">{children}</p>
    </li>
  );
}
