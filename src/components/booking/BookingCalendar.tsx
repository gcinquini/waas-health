"use client";

import { useState, useMemo, useCallback } from "react";
import {
  startOfWeek, addDays, addWeeks, subWeeks,
  format, isSameDay, isBefore, startOfDay,
  getMonth, getYear, setMonth, setYear,
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export interface BookedSlot {
  date: Date;
  hour: string;
}

export interface SelectedAppointment {
  date: Date;
  hour: string;
  label: string;
}

interface BookingCalendarProps {
  bookedSlots?: BookedSlot[];
  startHour?: number;
  endHour?: number;
  intervalMinutes?: number;
  bufferHours?: number;
  onSelect?: (appointment: SelectedAppointment | null) => void;
}

const DAY_NAMES = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function generateHours(start: number, end: number, interval: number): string[] {
  const slots: string[] = [];
  for (let h = start; h < end; h++) {
    for (let m = 0; m < 60; m += interval) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}

function slotKey(date: Date, hour: string): string {
  return `${format(date, "yyyy-MM-dd")}_${hour}`;
}

export default function BookingCalendar({
  bookedSlots = [],
  startHour = 5,
  endHour = 24,
  intervalMinutes = 60,
  bufferHours = 1,
  onSelect,
}: BookingCalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const router = useRouter();

  const [viewDate, setViewDate] = useState<Date>(today);
  const [weekStart, setWeekStart] = useState<Date>(
    startOfWeek(today, { weekStartsOn: 1 })
  );
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const hours = useMemo(
    () => generateHours(startHour, endHour, intervalMinutes),
    [startHour, endHour, intervalMinutes]
  );

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const bookedSet = useMemo(() => {
    const s = new Set<string>();
    bookedSlots.forEach((b) => s.add(slotKey(startOfDay(b.date), b.hour)));
    return s;
  }, [bookedSlots]);

  const isSlotDisabled = useCallback(
    (day: Date, hour: string): boolean => {
      if (isBefore(day, today) && !isSameDay(day, today)) return true;
      if (isSameDay(day, today)) {
        const [h, m] = hour.split(":").map(Number);
        const slotTime = new Date();
        slotTime.setHours(h, m, 0, 0);
        const cutoff = new Date();
        cutoff.setHours(cutoff.getHours() + bufferHours, cutoff.getMinutes(), 0, 0);
        return isBefore(slotTime, cutoff);
      }
      return false;
    },
    [today, bufferHours]
  );

  const handleMonthChange = useCallback((month: number) => {
    const newDate = setMonth(viewDate, month);
    setViewDate(newDate);
    setWeekStart(startOfWeek(new Date(getYear(newDate), month, 1), { weekStartsOn: 1 }));
    setSelectedKey(null);
  }, [viewDate]);

  const handleYearChange = useCallback((year: number) => {
    const newDate = setYear(viewDate, year);
    setViewDate(newDate);
    setWeekStart(startOfWeek(new Date(year, getMonth(newDate), 1), { weekStartsOn: 1 }));
    setSelectedKey(null);
  }, [viewDate]);

  const handlePrevWeek = useCallback(() => {
    setWeekStart((w) => subWeeks(w, 1));
    setSelectedKey(null);
  }, []);

  const handleNextWeek = useCallback(() => {
    setWeekStart((w) => addWeeks(w, 1));
    setSelectedKey(null);
  }, []);

  const handleSlotClick = useCallback(
    (day: Date, hour: string) => {
      const key = slotKey(day, hour);
      const next = selectedKey === key ? null : key;
      setSelectedKey(next);
      if (onSelect) {
        if (!next) {
          onSelect(null);
        } else {
          const label = `${format(day, "EEEE d 'de' MMMM", { locale: es })} a las ${hour} hs`;
          onSelect({ date: day, hour, label });
        }
      }
    },
    [selectedKey, onSelect]
  );

  const selectedLabel = useMemo(() => {
    if (!selectedKey) return null;
    const [dateStr, hour] = selectedKey.split("_");
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return `${format(date, "EEEE d 'de' MMMM", { locale: es })} a las ${hour} hs`;
  }, [selectedKey]);

  const years = useMemo(() => {
    const y = getYear(today);
    return [y - 1, y, y + 1, y + 2];
  }, [today]);

  return (
    <section className="bg-[#f9f6f2] h-screen flex flex-col py-6 px-4 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col flex-1 min-h-0 overflow-hidden">

        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 flex-shrink-0">

          {/* Título + botón volver */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-green-700
                         transition-colors group w-fit"
            >
              <ArrowLeft
                size={15}
                className="group-hover:-translate-x-0.5 transition-transform duration-150"
              />
              <span className="text-xs">Volver</span>
            </button>

            <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-green-700">
              Turnos online
            </span>
            <h2 className="font-serif text-3xl font-semibold text-neutral-900">
              Reservar{" "}
              <em className="font-normal italic text-green-700">tu turno</em>
            </h2>
          </div>

          {/* Controles de navegación */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={getMonth(viewDate)}
              onChange={(e) => handleMonthChange(Number(e.target.value))}
              className="text-sm border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-800
                         focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400
                         hover:border-green-300 transition-colors"
            >
              {MONTHS.map((m, i) => (
                <option key={m} value={i}>{m}</option>
              ))}
            </select>

            <select
              value={getYear(viewDate)}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="text-sm border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-800
                         focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400
                         hover:border-green-300 transition-colors"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={handlePrevWeek}
                aria-label="Semana anterior"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200
                           bg-white text-neutral-500 hover:border-green-400 hover:text-green-700
                           transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs text-neutral-400 min-w-[130px] text-center">
                {format(weekDays[0], "d MMM", { locale: es })}
                {" – "}
                {format(weekDays[6], "d MMM yyyy", { locale: es })}
              </span>
              <button
                onClick={handleNextWeek}
                aria-label="Semana siguiente"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200
                           bg-white text-neutral-500 hover:border-green-400 hover:text-green-700
                           transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Grilla con scroll interno */}
        <div className="flex-1 min-h-0 rounded-xl border border-neutral-100 bg-white overflow-hidden flex flex-col">

          {/* Header sticky de días */}
          <div className="overflow-x-auto flex-shrink-0">
            <div
              className="grid border-b border-neutral-100"
              style={{ gridTemplateColumns: `72px repeat(7, minmax(80px, 1fr))`, minWidth: "660px" }}
            >
              <div className="flex flex-col items-center justify-end pb-2 border-r border-neutral-100 px-1">
                <span className="text-[9px] font-semibold uppercase tracking-widest text-green-700 leading-none">
                  Inicio
                </span>
              </div>

              {weekDays.map((day, i) => {
                const isToday = isSameDay(day, today);
                return (
                  <div
                    key={i}
                    className="py-3 px-2 text-center border-r last:border-r-0 border-neutral-100"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      {DAY_NAMES[i]}
                    </div>
                    <div className="flex items-center justify-center">
                      <div
                        className={`
                          text-lg font-medium leading-none w-8 h-8 flex items-center justify-center rounded-full
                          ${isToday ? "bg-green-700 text-white" : "text-neutral-800"}
                        `}
                      >
                        {format(day, "d")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Body con scroll vertical */}
          <div className="overflow-auto flex-1">
            <div
              className="grid"
              style={{ gridTemplateColumns: `72px repeat(7, minmax(80px, 1fr))`, minWidth: "660px" }}
            >
              {hours.map((hour) => (
                <div key={hour} className="contents">
                  {/* Label de hora */}
                  <div
                    className="flex items-center justify-end pr-3 text-[11px] font-medium text-neutral-400
                               border-r border-b border-neutral-50 sticky left-0 bg-white z-10"
                    style={{ height: "52px" }}
                  >
                    {hour}
                  </div>

                  {/* Slots */}
                  {weekDays.map((day, di) => {
                    const key = slotKey(day, hour);
                    const isPast = isSlotDisabled(day, hour);
                    const isBooked = bookedSet.has(key);
                    const isSelected = selectedKey === key;
                    const isDisabled = isPast || isBooked;

                    return (
                      <button
                        key={`${di}-${hour}`}
                        disabled={isDisabled}
                        onClick={() => !isDisabled && handleSlotClick(day, hour)}
                        aria-label={`${format(day, "d MMM", { locale: es })} ${hour}`}
                        aria-pressed={isSelected}
                        className={`
                          border-r last:border-r-0 border-b border-neutral-50
                          transition-colors duration-100 focus:outline-none
                          focus-visible:ring-2 focus-visible:ring-green-300
                          ${isSelected
                            ? "bg-green-700 hover:bg-green-800"
                            : isBooked
                            ? "bg-amber-50 cursor-not-allowed"
                            : isPast
                            ? "bg-neutral-50 cursor-default"
                            : "hover:bg-green-50 cursor-pointer"
                          }
                        `}
                        style={{ height: "52px" }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leyenda */}
        <div className="flex gap-5 mt-3 flex-shrink-0 flex-wrap">
          {[
            { color: "bg-green-700", label: "Seleccionado" },
            { color: "bg-amber-50 border border-amber-200", label: "Reservado" },
            { color: "bg-neutral-100", label: "No disponible" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-sm ${color}`} />
              <span className="text-[11px] text-neutral-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Banner de selección */}
        <div
          className={`
            mt-3 flex-shrink-0 px-4 py-3 rounded-xl border text-sm transition-all duration-200
            ${selectedLabel
              ? "bg-white border-green-200 text-neutral-700"
              : "bg-white border-neutral-100 text-neutral-300"
            }
          `}
        >
          {selectedLabel ? (
            <span>
              <span className="w-2 h-2 rounded-full bg-green-600 inline-block mr-2 mb-0.5" />
              Turno seleccionado:{" "}
              <strong className="text-neutral-900 font-medium capitalize">
                {selectedLabel}
              </strong>
              {" — "}Completá tus datos para confirmar.
            </span>
          ) : (
            "Hacé clic en un bloque horario para seleccionar tu turno."
          )}
        </div>

      </div>
    </section>
  );
}