import { MenuItem } from '@/types/menu';

const API_BASE_URL = 'https://cloit-r65k.onrender.com';

export const menuService = {
  async getAllMenuItems(): Promise<MenuItem[]> {
    const response = await fetch(`${API_BASE_URL}/menu`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    return response.json();
  },

  async getMenuItem(id: string, depth: number = 1): Promise<MenuItem> {
    const response = await fetch(`${API_BASE_URL}/menu/${id}?depth=${depth}`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu item');
    }
    return response.json();
  },

  async createMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    const response = await fetch(`${API_BASE_URL}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Failed to create menu item');
    }
    return response.json();
  },

  async updateMenuItem(id: string, item: Partial<MenuItem>): Promise<MenuItem> {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Failed to update menu item');
    }
    return response.json();
  },

  async deleteMenuItem(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete menu item');
    }
  },
};
