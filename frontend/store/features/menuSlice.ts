import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { MenuItem, MenuState } from '@/types/menu';
import { menuService } from '@/services/menuService';

const initialState: MenuState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
};

export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async () => {
    try {
      const items = await menuService.getAllMenuItems();
      return items;
    } catch (error) {
      throw new Error('Failed to fetch menu items');
    }
  }
);

export const createMenuItem = createAsyncThunk(
  'menu/createMenuItem',
  async (item: Omit<MenuItem, 'id'>) => {
    try {
      const newItem = await menuService.createMenuItem(item);
      return newItem;
    } catch (error) {
      throw new Error('Failed to create menu item');
    }
  }
);

export const updateMenuItem = createAsyncThunk(
  'menu/updateMenuItem',
  async ({ id, updates }: { id: string; updates: Partial<MenuItem> }) => {
    try {
      const updatedItem = await menuService.updateMenuItem(id, updates);
      return updatedItem;
    } catch (error) {
      throw new Error('Failed to update menu item');
    }
  }
);

export const deleteMenuItem = createAsyncThunk(
  'menu/deleteMenuItem',
  async (id: string) => {
    const response = await fetch(`/api/menus/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    return id;
  }
);

const addExpandedProperty = (items: MenuItem[] | undefined): MenuItem[] => {
  if (!items) return [];
  return items.map(item => ({
    ...item,
    isExpanded: false,
    children: item.children ? addExpandedProperty(item.children) : undefined
  }));
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedItem: (state: MenuState, action: PayloadAction<MenuItem | null>) => {
      state.selectedItem = action.payload;
    },
    toggleExpanded: (state: MenuState, action: PayloadAction<string>) => {
      const toggleItem = (items: MenuItem[]): MenuItem[] => {
        return items.map(item => {
          if (item.id === action.payload) {
            return { ...item, isExpanded: !item.isExpanded };
          }
          if (item.children) {
            return { ...item, children: toggleItem(item.children) };
          }
          return item;
        });
      };
      state.items = toggleItem(state.items);
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<MenuState>) => {
    builder
      .addCase(fetchMenuItems.pending, (state: MenuState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state: MenuState, action: PayloadAction<MenuItem[]>) => {
        state.loading = false;
        state.items = addExpandedProperty(action.payload);
      })
      .addCase(fetchMenuItems.rejected, (state: MenuState, action: any) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch menu items';
      })
      .addCase(createMenuItem.fulfilled, (state: MenuState) => {
        state.loading = false;
      })
      .addCase(updateMenuItem.fulfilled, (state: MenuState) => {
        state.loading = false;
      })
      .addCase(deleteMenuItem.fulfilled, (state: MenuState, action: PayloadAction<string>) => {
        state.loading = false;
        const removeItem = (items: MenuItem[]): MenuItem[] => {
          return items.filter(item => {
            if (item.id === action.payload) return false;
            if (item.children) {
              item.children = removeItem(item.children);
            }
            return true;
          });
        };
        state.items = removeItem(state.items);
      });
  },
});

export const { setSelectedItem, toggleExpanded } = menuSlice.actions;
export default menuSlice.reducer;
