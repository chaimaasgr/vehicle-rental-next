import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-asphalt-700/10 bg-mist-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded">
          <span className="font-display text-xl font-bold tracking-tight text-asphalt-900">
            Atracio<span className="text-signal-500">Drive</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="focus-ring rounded text-sm font-medium text-asphalt-700 hover:text-asphalt-900"
          >
            Accueil
          </Link>
          <Link
            href="/catalogue"
            className="focus-ring rounded text-sm font-medium text-asphalt-700 hover:text-asphalt-900"
          >
            Catalogue
          </Link>
        </nav>

        <Link
          href="/catalogue"
          className="focus-ring rounded-full bg-asphalt-900 px-5 py-2.5 text-sm font-semibold text-mist-50 transition hover:bg-signal-500 hover:text-asphalt-900"
        >
          Réserver maintenant
        </Link>
      </div>
    </header>
  );
}
