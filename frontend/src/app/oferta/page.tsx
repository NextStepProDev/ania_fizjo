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
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
        Oferta i cennik
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">
        Jak możemy Ci pomóc
      </h1>

      {services.length === 0 ? (
        <p className="mt-14 text-lg text-ink-soft">
          Cennik jest w przygotowaniu — zadzwoń, chętnie odpowiemy na pytania.
        </p>
      ) : (
        <ul className="mt-14 divide-y divide-line border-y border-line">
          {services.map((service, index) => (
            <Reveal
              key={service.documentId}
              as="li"
              delay={index * 0.08}
              className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <div className="max-w-xl">
                <h2 className="font-display text-lg font-semibold text-ink">
                  {service.name}
                </h2>
                {service.description && (
                  <p className="mt-1 text-sm leading-6 text-ink-soft">
                    {service.description}
                  </p>
                )}
              </div>
              <p className="shrink-0 font-display text-lg font-semibold text-accent">
                {service.price}
              </p>
            </Reveal>
          ))}
        </ul>
      )}

      <div className="mt-12">
        <Link
          href="/kontakt"
          className="inline-flex h-12 items-center justify-center bg-accent px-8 font-display text-sm font-semibold tracking-wide text-paper transition-colors hover:bg-accent-dark"
        >
          Umów wizytę
        </Link>
      </div>
    </section>
  );
}
