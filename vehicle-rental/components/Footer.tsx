import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-asphalt-700/10 bg-asphalt-950 text-mist-100">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <span className="font-display text-lg font-bold text-mist-50">
              Atracio
            </span>
            <p className="mt-3 max-w-xs text-sm text-mist-200/70">
              Maquette fonctionnelle de location de véhicules, développée
              pour explorer les futurs modules web de la plateforme Atracio.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-mist-200/70">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="focus-ring rounded hover:text-signal-400">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogue"
                  className="focus-ring rounded hover:text-signal-400"
                >
                  Catalogue des véhicules
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-mist-200/70">
              Projet
            </h3>
            <p className="mt-4 text-sm text-mist-200/70">
              Ce site est une démonstration technique. Les données véhicules,
              options et réservations proviennent d&apos;une API simulée et
              n&apos;ont pas de valeur contractuelle.
            </p>
          </div>
        </div>

        <div className="route-line mt-10 opacity-20" />
        <p className="mt-6 text-xs text-mist-200/50">
          © {new Date().getFullYear()} Atracio — Maquette de stage,
          données fictives.
        </p>
      </div>
    </footer>
  );
}