import { Link } from "@tanstack/react-router";
import { Car, Globe2, ShieldCheck, Store } from "lucide-react";
import { COUNTRIES } from "@/lib/mock-data";

type Props = {
  selectedCountry: string;
  onCountryChange: (code: string) => void;
};

export function SiteHeader({ selectedCountry, onCountryChange }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Car className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">GlobalDrive</span>
          </Link>

          <div className="flex items-center gap-3">
            <label className="hidden text-sm text-muted-foreground sm:block">Votre pays :</label>
            <select
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="rounded-lg border border-input bg-card px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <InfoPill
            icon={<Globe2 className="h-4 w-4" />}
            title="Achetez partout dans le monde"
            desc="Trouvez votre voiture dans n'importe quel pays, en un clic."
          />
          <InfoPill
            icon={<Store className="h-4 w-4" />}
            title="Tous les marchés répertoriés"
            desc="Concessionnaires et marchés de vente locaux enregistrés."
          />
          <InfoPill
            icon={<ShieldCheck className="h-4 w-4" />}
            title="Zéro frais de transport"
            desc="La voiture est déjà disponible dans votre pays d'achat."
          />
        </div>
      </div>
    </header>
  );
}

function InfoPill({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/50 p-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold leading-tight">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
