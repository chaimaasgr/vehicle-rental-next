import { dataProvider } from "@/lib/data-provider";
import { CatalogueClient } from "./CatalogueClient";

export const metadata = {
  title: "Catalogue — Atracio",
};

export default async function CataloguePage() {
  const vehicles = await dataProvider.getVehicles();

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-signal-600">
        Catalogue
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-asphalt-900">
        Trouvez le véhicule qu&apos;il vous faut
      </h1>
      <p className="mt-2 max-w-2xl text-asphalt-600">
        Filtrez par catégorie, prix, transmission ou nombre de places pour
        affiner votre recherche.
      </p>

      <div className="mt-10">
        <CatalogueClient initialVehicles={vehicles} />
      </div>
    </section>
  );
}
