import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { MenuItem, MenuState } from '@/types/menu';

const initialState: MenuState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
};

export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async () => {
    const response = await fetch('/api/menus');
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
);

export const createMenuItem = createAsyncThunk(
  'menu/createMenuItem',
  async (item: Omit<MenuItem, 'id'>) => {
    const response = await fetch('/api/menus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    return response.json();
  }
);

export const updateMenuItem = createAsyncThunk(
  'menu/updateMenuItem',
  async ({ id, updates }: { id: string; updates: Partial<MenuItem> }) => {
    const response = await fetch(`/api/menus/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    return response.json();
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

const addExpandedProperty = (items: MenuItem[]): MenuItem[] => {
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
    setSelectedItem: (state, action: PayloadAction<MenuItem | null>) => {
      state.selectedItem = action.payload;
    },
    toggleExpanded: (state, action: PayloadAction<string>) => {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = addExpandedProperty(action.payload);
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch menu items';
      })
      .addCase(createMenuItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMenuItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
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
