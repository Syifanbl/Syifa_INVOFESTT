import { create } from "zustand";
import { persist } from "zustand/middleware"; // 1. Import persist

interface Event {
  id: string;
  name: string;
  pembicara: string;
  waktu: string;
}

interface EventState {
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => void;
  deleteEvent: (id: string) => void;
}

export const useEventStore = create<EventState>()(
  persist( // 2. Bungkus dengan persist
    (set) => ({
      events: [],
      addEvent: (newEvent) =>
        set((state) => ({
          events: [
            ...state.events,
            { ...newEvent, id: Date.now().toString() },
          ],
        })),
      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((evt) => evt.id !== id),
        })),
    }),
    {
      name: "invofest-event-storage", // Nama storage di browser
    }
  )
);