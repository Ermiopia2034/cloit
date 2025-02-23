import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: string
  name: string // maps to backend's label
  href?: string // maps to backend's url
  icon?: LucideIcon
  children?: MenuItem[]
  isExpanded?: boolean
  parentId?: string
  depth?: number

  // Backend response fields that we map from
  label?: string
  url?: string
}

export interface MenuState {
  items: MenuItem[]
  selectedItem: MenuItem | null
  loading: boolean
  error: string | null
}

