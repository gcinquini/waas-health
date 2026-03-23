"use client";

import { useState } from "react";
import BookingCalendar, {
  type SelectedAppointment,
  type BookedSlot,
} from "@/components/booking/BookingCalendar";

const BOOKED_SLOTS: BookedSlot[] = [
  { date: new Date(), hour: "09:00" },
  { date: new Date(), hour: "10:00" },
  { date: new Date(), hour: "14:00" },
];

export default function ContactoPage() {
  const [appointment, setAppointment] = useState<SelectedAppointment | null>(null);

  return (
    <main className="h-screen overflow-hidden bg-[#f9f6f2]">
      <BookingCalendar
        bookedSlots={BOOKED_SLOTS}
        startHour={5}
        endHour={24}
        intervalMinutes={60}
        bufferHours={1}
        onSelect={(appt) => setAppointment(appt)}
      />
    </main>
  );
}