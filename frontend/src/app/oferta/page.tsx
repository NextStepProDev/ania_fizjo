import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/strapi";
import { BRAND } from "@/lib/contact";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Oferta i cennik",
  description: `Oferta gabinetu ${BRAND} w Libiążu — fizjoterapia ortopedyczna i sportowa, gimnastyka korekcyjna, trening medyczny, kinesiotaping, masaż. Sprawdź cennik.`,
};

export default async function OfertaPage() {
  const services = await getServices();

  return (
    <div className="section-dark grain relative flex-1 overflow-hidden">
      <div aria-hidden className="halo absolute inset-0" />
      <section className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="kicker text-glow">Oferta i cennik</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
          Jak możemy Ci pomóc
        </h1>

        {services.length === 0 ? (
          <p className="mt-14 text-lg text-paper/70">
            Cennik jest w przygotowaniu — zadzwoń, chętnie odpowiemy na
            pytania.
          </p>
        ) : (
          <ul className="mt-14 divide-y divide-paper/10 border-y border-paper/10">
            {services.map((service, index) => (
              <Reveal
                key={service.documentId}
                as="li"
                delay={index * 0.08}
                className="py-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-lg font-semibold">
                    {service.name}
                  </h2>
                  <span
                    aria-hidden
                    className="hidden flex-1 border-b border-dotted border-paper/25 sm:block"
                  />
                  <p className="shrink-0 font-display text-lg font-semibold tabular-nums text-glow">
                    {service.price}
                  </p>
                </div>
                {service.description && (
                  <p className="mt-1 max-w-xl text-sm leading-6 text-paper/60">
                    {service.description}
                  </p>
                )}
              </Reveal>
            ))}
          </ul>
        )}

        <div className="mt-12">
          <Link href="/kontakt" className="btn btn-primary">
            Umów wizytę
          </Link>
        </div>
      </section>
    </div>
  );
}
