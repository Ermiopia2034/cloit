import { MenuItem } from '@/types/menu';

const API_BASE_URL = 'https://cloit-r65k.onrender.com';

export const menuService = {
  // Transform backend response to frontend model
  transformMenuItem(item: any): MenuItem {
    return {
      id: item.id,
      name: item.label,
      href: item.url,
      parentId: item.parentId,
      children: item.children ? this.transformMenuItems(item.children) : undefined,
      isExpanded: false
    };
  },

  transformMenuItems(items: any[]): MenuItem[] {
    return items.map(item => this.transformMenuItem(item));
  },

  async getAllMenuItems(): Promise<MenuItem[]> {
    const response = await fetch(`${API_BASE_URL}/menu`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    const data = await response.json();
    return this.transformMenuItems(data);
  },

  async getMenuItem(id: string, depth: number = 1): Promise<MenuItem> {
    const response = await fetch(`${API_BASE_URL}/menu/${id}?depth=${depth}`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu item');
    }
    const data = await response.json();
    return this.transformMenuItem(data);
  },

  async createMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    const dto = {
      label: item.name,
      url: item.href,
      parentId: item.parentId
    };
    const response = await fetch(`${API_BASE_URL}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error('Failed to create menu item');
    }
    const data = await response.json();
    return this.transformMenuItem(data);
  },

  async updateMenuItem(id: string, item: Partial<MenuItem>): Promise<MenuItem> {
    const dto = {
      label: item.name,
      url: item.href,
      parentId: item.parentId
    };
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error('Failed to update menu item');
    }
    const data = await response.json();
    return this.transformMenuItem(data);
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
