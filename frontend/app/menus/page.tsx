"use client"

import { MenuTree } from "@/components/menu-tree"
import { MenuDetails } from "@/components/menu-details"
import { useState } from "react"
import type { MenuItem } from "@/types/menu"
import { menuService } from "@/services/menuService"

export default function MenusPage() {
  const [selectedItem, setSelectedItem] = useState<{
    id: string
    name: string
    depth: number
    parentName?: string
  } | null>(null)

  const handleMenuSelect = (item: MenuItem | null) => {
    if (!item) {
      setSelectedItem(null)
      return
    }
    setSelectedItem({
      id: item.id,
      name: item.name,
      depth: item.depth ?? 0,
      parentName: item.parentId
    })
  }

  const handleUpdate = async (id: string, updates: { name: string }) => {
    try {
      await menuService.updateMenuItem(id, {
        name: updates.name
      })
    } catch (error) {
      console.error('Failed to update menu:', error)
      throw new Error('Failed to update menu')
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Menus</h1>
        <div className="text-sm text-muted-foreground">Menu</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MenuTree onSelect={handleMenuSelect} />
        <MenuDetails selectedItem={selectedItem} onUpdate={handleUpdate} />
      </div>
    </div>
  )
}

