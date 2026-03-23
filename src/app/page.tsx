import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import { Sparkles, Smile, Layers } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Hero
        // ESTAS SON LAS PROPS QUE FALTABAN:
        title="Tu sonrisa,"
        titleHighlight="nuestra pasión"
        subtitle="Tratamientos personalizados con tecnología de vanguardia y profesionales dedicados a tu bienestar integral."
        
        // EL RESTO SE MANTIENE IGUAL:
        ctaPrimary={{ label: "Reservar turno", href: "/contacto" }}
        ctaSecondary={{ label: "Ver tratamientos", href: "/servicios" }}
        stats={[
          { value: "2.4k+", label: "Pacientes felices" },
          { value: "12", label: "Años de experiencia" },
          { value: "98%", label: "Satisfacción" },
        ]}
      />

      <Services
        title="Cuidamos cada detalle"
        titleHighlight="de tu bienestar"
        services={[
          {
            icon: Sparkles,
            title: "Limpieza Facial",
            description:
              "Limpieza profunda con extracción de comedones, vapor de ozono e hidratación post-tratamiento. Piel renovada en una sesión.",
            price: "$8.500",
            pricePrefix: "desde",
          },
          {
            icon: Smile,
            title: "Botox Facial",
            description:
              "Toxina botulínica de primera línea para suavizar líneas de expresión. Resultado natural, efecto desde las 72 horas.",
            price: "$45.000",
            pricePrefix: "desde",
            featured: true,
          },
          {
            icon: Layers,
            title: "Peeling Químico",
            description:
              "Renovación celular con ácidos de alta concentración. Trata manchas, acné y textura irregular. Protocolo personalizado.",
            // sin price → muestra "Precio a consultar"
          },
        ]}
      />
    </main>
  );
}