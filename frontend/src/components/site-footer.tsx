import { Mail, Phone, Car } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Car className="h-4 w-4" />
              </div>
              <span className="font-bold">GlobalDrive</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Achetez la voiture de vos rêves partout dans le monde, sans frais de transport.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:contact@globaldrive.com" className="hover:text-foreground">
                  contact@globaldrive.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+33123456789" className="hover:text-foreground">
                  +33 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Informations</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              Pour toute question sur nos offres, marchés ou pour un accompagnement personnalisé,
              n'hésitez pas à nous contacter par email ou téléphone.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} GlobalDrive. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
