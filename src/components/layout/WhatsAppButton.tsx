"use client";

import { MessageCircle } from "lucide-react";
import type { FC } from "react";

const WhatsAppButton: FC = () => {
  const phone = "5491111111111"; // Reemplazá con tu número real (formato internacional)
  const message = encodeURIComponent("¡Hola! Vi tu página web y me gustaría consultar por un turno.");
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} strokeWidth={2} />
      <span className="absolute right-full mr-3 bg-white text-neutral-800 text-sm font-medium px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-neutral-100">
        ¿Tenés dudas? Escribinos
      </span>
    </a>
  );
};

export default WhatsAppButton;