import type { FC } from "react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  title: string;
  description: string;
  price?: string;          // opcional — si no se pasa, muestra "Precio a consultar"
  pricePrefix?: string;    // ej: "desde", "por sesión"
  icon: LucideIcon;
  featured?: boolean;      // muestra badge "Popular"
}

interface ServicesProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  services: Service[];
  ctaLabel?: string;
}

const Services: FC<ServicesProps> = ({
  eyebrow = "Nuestros tratamientos",
  title = "Cuidamos cada detalle",
  titleHighlight = "de tu bienestar",
  subtitle = "Tecnología de vanguardia y profesionales certificados para resultados que se notan.",
  services,
  ctaLabel = "Ver más",
}) => {
  return (
    <section className="bg-[#f9f6f2] py-20 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          {eyebrow && (
            <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-green-700">
              {eyebrow}
            </span>
          )}
          <h2 className="font-serif text-4xl font-semibold text-neutral-900 mt-2 leading-tight">
            {title}
            {titleHighlight && (
              <>
                <br />
                <em className="font-normal italic text-green-700">{titleHighlight}</em>
              </>
            )}
          </h2>
          {subtitle && (
            <p className="mt-3 text-neutral-400 font-light text-base max-w-lg mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`
                  bg-white rounded-2xl p-7 flex flex-col border transition-colors duration-200
                  hover:border-green-400
                  ${service.featured ? "border-green-400" : "border-neutral-100"}
                `}
              >
                {/* Icon + badge */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                    <Icon size={20} className="text-green-800" strokeWidth={1.8} />
                  </div>
                  {service.featured && (
                    <span className="text-[11px] font-medium bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="font-serif text-lg font-semibold text-neutral-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Footer */}
                <div className="flex items-end justify-between mt-5 pt-4 border-t border-neutral-50">
                  <div>
                    {service.price ? (
                      <>
                        {service.pricePrefix && (
                          <span className="block text-[11px] text-neutral-300 mb-0.5">
                            {service.pricePrefix}
                          </span>
                        )}
                        <span className="font-serif text-lg font-semibold text-neutral-900">
                          {service.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-neutral-300 font-light">
                        Precio a consultar
                      </span>
                    )}
                  </div>
                  <button className="text-xs font-medium text-green-700 hover:text-green-900 transition-colors flex items-center gap-1">
                    {service.price ? ctaLabel : "Consultar"} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;