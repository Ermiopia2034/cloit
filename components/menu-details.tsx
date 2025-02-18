"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface MenuDetailsProps {
  selectedItem: {
    id: string
    name: string
    depth: number
    parentName?: string
  } | null
  onUpdate: (id: string, updates: { name: string }) => Promise<void>
}

export function MenuDetails({ selectedItem, onUpdate }: MenuDetailsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(selectedItem?.name || "")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedItem) return

    setIsLoading(true)
    try {
      await onUpdate(selectedItem.id, { name })
      toast({
        title: "Success",
        description: "Menu item updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update menu item: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!selectedItem) {
    return (
      <div className="border rounded-lg p-6">
        <p className="text-muted-foreground text-center">Select a menu item to view details</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Menu ID</Label>
          <Input value={selectedItem.id} readOnly />
        </div>

        <div className="space-y-2">
          <Label>Depth</Label>
          <Input value={selectedItem.depth} readOnly className="bg-muted" />
        </div>

        {selectedItem.parentName && (
          <div className="space-y-2">
            <Label>Parent Data</Label>
            <Input value={selectedItem.parentName} readOnly />
          </div>
        )}

        <div className="space-y-2">
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter menu name" />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </form>
  )
}

