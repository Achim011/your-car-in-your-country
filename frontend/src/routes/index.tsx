import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Zap, Fuel } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CARS, COUNTRIES, MARKETS } from "@/lib/mock-data";
import heroImg from "@/assets/hero-cars.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GlobalDrive — Achetez une voiture partout dans le monde" },
      {
        name: "description",
        content:
          "Achetez n'importe quelle voiture (électrique, essence, hybride) directement dans votre pays. Zéro frais de transport. Marchés répertoriés dans le monde entier.",
      },
      { property: "og:title", content: "GlobalDrive — Voitures sans frontières" },
      {
        property: "og:description",
        content: "Trouvez et achetez votre voiture dans votre pays. Sans frais de transport.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [country, setCountry] = useState("FR");

  const countryName = COUNTRIES.find((c) => c.code === country)?.name ?? "";
  const localMarkets = useMemo(() => MARKETS.filter((m) => m.countryCode === country), [country]);
  const localCars = useMemo(() => CARS.filter((c) => c.countryCode === country), [country]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader selectedCountry={country} onCountryChange={setCountry} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <img
            src={heroImg}
            alt="Showroom de voitures modernes"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              La voiture qu'il vous faut,{" "}
              <span className="text-primary">déjà dans votre pays.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              GlobalDrive répertorie tous les marchés de vente de voitures dans le monde.
              Sélectionnez votre pays et achetez sans frais de transport — électrique, essence,
              hybride ou diesel.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <Stat value={COUNTRIES.length.toString()} label="Pays couverts" />
              <Stat value={MARKETS.length.toString()} label="Marchés partenaires" />
              <Stat
                value={MARKETS.reduce((a, m) => a + m.cars, 0).toLocaleString("fr-FR")}
                label="Voitures disponibles"
              />
            </div>
          </div>
        </section>

        {/* Markets for the selected country */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                Marchés en {countryName}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {localMarkets.length} marché{localMarkets.length > 1 ? "s" : ""} de vente
                enregistré{localMarkets.length > 1 ? "s" : ""} dans votre pays.
              </p>
            </div>
          </div>

          {localMarkets.length === 0 ? (
            <EmptyState label="Aucun marché répertorié pour l'instant dans ce pays." />
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {localMarkets.map((m) => (
                <div
                  key={m.id}
                  className="rounded-2xl border border-border/60 bg-card p-5 transition hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wide">{m.city}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{m.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {m.cars} voitures disponibles
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Cars for the selected country */}
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <h2 className="text-2xl font-bold md:text-3xl">
            Voitures disponibles en {countryName}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Directement chez un marchand local — aucun frais de transport à prévoir.
          </p>

          {localCars.length === 0 ? (
            <EmptyState label="Aucune voiture disponible dans ce pays pour le moment." />
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {localCars.map((car) => (
                <article
                  key={car.id}
                  className="group overflow-hidden rounded-2xl border border-border/60 bg-card transition hover:border-primary/60 hover:shadow-xl"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {car.brand} {car.model}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {car.year} · {car.market}
                        </p>
                      </div>
                      <span
                        className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                          car.type === "Électrique"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {car.type === "Électrique" ? (
                          <Zap className="h-3 w-3" />
                        ) : (
                          <Fuel className="h-3 w-3" />
                        )}
                        {car.type}
                      </span>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <p className="text-xl font-bold">
                        {car.price.toLocaleString("fr-FR")} {car.currency}
                      </p>
                      <button className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90">
                        Acheter
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 px-4 py-3 backdrop-blur">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
      {label}
    </div>
  );
}
