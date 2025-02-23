import { create } from 'zustand';
import { MenuItem, MenuState } from '@/types/menu';
import { menuService } from '@/services/menuService';

type MenuStore = MenuState & {
  fetchMenuItems: () => Promise<void>;
  selectItem: (item: MenuItem | null) => void;
  expandItem: (id: string, expanded: boolean) => void;
  createItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
};

export const useMenuStore = create<MenuStore>((set, get) => ({
  items: [],
  selectedItem: null,
  loading: false,
  error: null,

  fetchMenuItems: async () => {
    set({ loading: true, error: null });
    try {
      const items = await menuService.getAllMenuItems();
      set({ items, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  selectItem: (item: MenuItem | null) => {
    set({ selectedItem: item });
  },

  expandItem: (id: string, expanded: boolean) => {
    set((state: MenuState) => ({
      ...state,
      items: state.items.map((item) =>
        item.id === id ? { ...item, isExpanded: expanded } : item
      ),
    }));
  },

  createItem: async (item: Omit<MenuItem, 'id'>) => {
    set({ loading: true, error: null });
    try {
      await menuService.createMenuItem(item);
      await get().fetchMenuItems();
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateItem: async (id: string, item: Partial<MenuItem>) => {
    set({ loading: true, error: null });
    try {
      await menuService.updateMenuItem(id, item);
      await get().fetchMenuItems();
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteItem: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await menuService.deleteMenuItem(id);
      await get().fetchMenuItems();
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
