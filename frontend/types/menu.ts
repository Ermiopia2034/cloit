export interface MenuItem {
  id: string
  name: string
  children?: MenuItem[]
  isExpanded?: boolean
  parentId?: string
  depth?: number
}

export interface MenuState {
  items: MenuItem[]
  selectedItem: MenuItem | null
  loading: boolean
  error: string | null
}

