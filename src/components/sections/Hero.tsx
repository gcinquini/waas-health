// src/components/sections/Hero.tsx
import type { FC } from "react";

interface HeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  stats?: { value: string; label: string }[];
}

const Hero: FC<HeroProps> = ({
  badge = "Odontología & Estética",
  title = "Tu sonrisa,",
  titleHighlight = "nuestra pasión",
  subtitle = "Tratamientos personalizados con tecnología de vanguardia.",
  ctaPrimary,
  ctaSecondary,
  stats,
}) => {
  return (
    <section className="min-h-screen bg-[#f9f6f2] flex items-center px-6 lg:px-16">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">

        {/* Left — Copy */}
        <div>
          {badge && (
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-green-700" />
              {badge}
            </span>
          )}

          <h1 className="font-serif text-5xl lg:text-6xl font-semibold leading-tight mt-4 text-neutral-900">
            {title}
            {titleHighlight && (
              <>
                <br />
                <em className="font-normal italic text-green-700">{titleHighlight}</em>
              </>
            )}
          </h1>

          <p className="mt-4 text-neutral-500 text-lg font-light leading-relaxed max-w-md">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {/* Botón Primario Corregido */}
            <a 
              href={ctaPrimary.href}
              className="inline-flex items-center gap-2 bg-neutral-900 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-neutral-700 transition-colors"
            >
              {ctaPrimary.label} &rarr;
            </a>

            {ctaSecondary && (
              /* Botón Secundario Corregido */
              <a 
                href={ctaSecondary.href}
                className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-800 text-sm px-5 py-3 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                {ctaSecondary.label}
              </a>
            )}
          </div>

          {stats && stats.length > 0 && (
            <div className="flex items-center gap-8 mt-10">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-8">
                  {i > 0 && <div className="w-px h-10 bg-neutral-200" />}
                  <div>
                    <div className="font-serif text-3xl font-semibold text-neutral-900">{stat.value}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — Visual placeholder */}
        <div className="hidden lg:flex rounded-2xl bg-gradient-to-br from-green-200 via-green-400 to-green-700 h-[480px] items-end justify-center relative overflow-hidden">
          <div className="absolute top-5 right-5 bg-white rounded-xl px-4 py-2.5 shadow-md text-sm">
            <p className="text-neutral-400 text-xs">Próximo turno</p>
            <p className="font-medium text-neutral-800">Lunes 10:00 hs</p>
          </div>
          <div className="relative bg-white rounded-xl p-4 mx-4 mb-4 w-full shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-medium text-green-800">DR</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-800">Dr. Gino Cinquini</p>
                <p className="text-yellow-400 text-xs tracking-widest">★★★★★</p>
              </div>
              <span className="text-xs text-green-600 font-medium">Verificada</span>
            </div>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">"Excelente atención, el resultado superó mis expectativas"</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;