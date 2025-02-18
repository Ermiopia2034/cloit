"use client"

import { MenuTree } from "@/components/menu-tree"
import { MenuDetails } from "@/components/menu-details"
import { useState } from "react"
import type { MenuItem } from "@/types/menu"

export default function MenusPage() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const handleUpdate = async (id: string, updates: { name: string }) => {
    const response = await fetch("/api/menus", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, updates }),
    })

    if (!response.ok) {
      throw new Error("Failed to update menu")
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Menus</h1>
        <div className="text-sm text-muted-foreground">Menu</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MenuTree onSelect={setSelectedItem} />
        <MenuDetails selectedItem={selectedItem} onUpdate={handleUpdate} />
      </div>
    </div>
  )
}

