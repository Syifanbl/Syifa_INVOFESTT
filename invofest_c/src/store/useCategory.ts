import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Category {
  id: string;
  name: string;
  createdAt: string;
}

interface CategoryState {
  categories: Category[];

  addCategory: (name: string) => void;

  deleteCategory: (id: string) => void;

  updateCategory: (
    id: string,
    newName: string
  ) => void;
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [],

      // TAMBAH CATEGORY
      addCategory: (name) =>
        set((state) => ({
          categories: [
            ...state.categories,
            {
              id: Date.now().toString(),
              name,
              createdAt: new Date().toLocaleDateString("id-ID"),
            },
          ],
        })),

      // HAPUS CATEGORY
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter(
            (cat) => cat.id !== id
          ),
        })),

      // UPDATE CATEGORY
      updateCategory: (id, newName) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === id
              ? { ...cat, name: newName }
              : cat
          ),
        })),
    }),
    {
      name: "category-storage",
    }
  )
);

