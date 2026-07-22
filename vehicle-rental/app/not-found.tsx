import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-signal-600">
        Erreur 404
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold text-asphalt-900">
        Cette page a quitté la route
      </h1>
      <p className="mt-3 text-asphalt-600">
        Le véhicule ou la page que vous cherchez n&apos;existe pas ou n&apos;est
        plus disponible.
      </p>
      <Link
        href="/catalogue"
        className="focus-ring mt-8 rounded-full bg-asphalt-900 px-6 py-3 text-sm font-semibold text-mist-50 hover:bg-signal-500 hover:text-asphalt-950"
      >
        Voir le catalogue
      </Link>
    </section>
  );
}
