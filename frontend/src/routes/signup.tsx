import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Car } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/lib/api";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Créer un compte — GlobalDrive" },
      {
        name: "description",
        content: "Créez votre compte GlobalDrive pour acheter une voiture dans votre pays.",
      },
    ],
  }),
  component: SignupPage,
});

const signupSchema = z
  .object({
    first_name: z.string().min(1, "Prénom requis"),
    username: z.string().min(3, "Au moins 3 caractères"),
    email: z.string().email("Email invalide"),
    password: z.string().min(8, "Au moins 8 caractères"),
    password_confirm: z.string().min(1, "Confirmez le mot de passe"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirm"],
  });

type SignupValues = z.infer<typeof signupSchema>;

function SignupPage() {
  const { register: registerUser, user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: "",
      username: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  });

  useEffect(() => {
    if (!authLoading && user) {
      void navigate({ to: "/" });
    }
  }, [authLoading, user, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      await registerUser(values);
      toast.success("Compte créé avec succès.");
      await navigate({ to: "/" });
    } catch (err) {
      if (err instanceof ApiError) {
        const fieldMap: Record<string, keyof SignupValues> = {
          username: "username",
          email: "email",
          first_name: "first_name",
          password: "password",
          password_confirm: "password_confirm",
        };

        let appliedFieldError = false;
        for (const [key, field] of Object.entries(fieldMap)) {
          const value = err.data[key];
          if (Array.isArray(value) && value[0]) {
            setError(field, { message: String(value[0]) });
            appliedFieldError = true;
          } else if (typeof value === "string") {
            setError(field, { message: value });
            appliedFieldError = true;
          }
        }

        if (!appliedFieldError) {
          setError("root", { message: err.message });
        }
        toast.error(err.message);
      } else {
        const message = "Impossible de créer le compte.";
        setError("root", { message });
        toast.error(message);
      }
    } finally {
      setSubmitting(false);
    }
  });

  if (authLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Chargement…</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Car className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">GlobalDrive</span>
        </Link>
        <Link
          to="/login"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Se connecter
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card/80 p-8 shadow-sm backdrop-blur-sm">
          <h1 className="text-2xl font-bold tracking-tight">Créer un compte</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Rejoignez GlobalDrive pour trouver votre voiture dans votre pays.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="first_name">Prénom</Label>
              <Input
                id="first_name"
                autoComplete="given-name"
                placeholder="Marie"
                disabled={submitting}
                {...register("first_name")}
              />
              {errors.first_name && (
                <p className="text-sm text-destructive">{errors.first_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Nom d&apos;utilisateur</Label>
              <Input
                id="username"
                autoComplete="username"
                placeholder="marie_dupont"
                disabled={submitting}
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="marie@exemple.com"
                disabled={submitting}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Au moins 8 caractères"
                disabled={submitting}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirm">Confirmer le mot de passe</Label>
              <Input
                id="password_confirm"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                disabled={submitting}
                {...register("password_confirm")}
              />
              {errors.password_confirm && (
                <p className="text-sm text-destructive">
                  {errors.password_confirm.message}
                </p>
              )}
            </div>

            {errors.root && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {errors.root.message}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Création…" : "Créer mon compte"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
