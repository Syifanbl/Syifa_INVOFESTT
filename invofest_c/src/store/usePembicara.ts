import { create } from "zustand";
import { persist } from "zustand/middleware";

type Pembicara = {
  id: number;
  name: string;
  role: string;
  image: string;
};

interface PembicaraState {
  pembicaras: Pembicara[];
  addPembicara: (data: Omit<Pembicara, "id">) => void;
  deletePembicara: (id: number) => void;
}

export const usePembicaraStore = create<PembicaraState>()(
  persist(
    (set) => ({
      pembicaras: [],

      addPembicara: (data) =>
        set((state) => ({
          pembicaras: [
            ...state.pembicaras,
            { ...data, id: Date.now() },
          ],
        })),

      deletePembicara: (id) =>
        set((state) => ({
          pembicaras: state.pembicaras.filter((p) => p.id !== id),
        })),
    }),
    { name: "pembicara-storage" }
  )
);