"use client"

import { MenuTree } from "@/components/menu-tree"
import { MenuDetails } from "@/components/menu-details"
import { useState } from "react"
import type { MenuItem } from "@/types/menu"
import { menuService } from "@/services/menuService"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store"
import { saveMenu } from "@/store/features/menuSlice"
import { toast } from "@/components/ui/use-toast"

export default function MenusPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.menu)
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

  const handleSaveMenu = async () => {
    try {
      await dispatch(saveMenu()).unwrap()
      toast({
        title: "Success",
        description: "Menu structure saved successfully",
        variant: "default",
      })
    } catch (error) {
      console.error('Failed to save menu structure:', error)
      toast({
        title: "Error",
        description: "Failed to save menu structure",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Menus</h1>
          <div className="text-sm text-muted-foreground">Menu</div>
        </div>
        <Button 
          onClick={handleSaveMenu} 
          disabled={loading}
          className="bg-[#14161F] text-white hover:bg-[#14161F]/90"
        >
          {loading ? "Saving..." : "Save Menu"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MenuTree onSelect={handleMenuSelect} />
        <MenuDetails selectedItem={selectedItem} onUpdate={handleUpdate} />
      </div>
    </div>
  )
}
