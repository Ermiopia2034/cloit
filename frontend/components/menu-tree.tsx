"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronDown, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import type { MenuItem } from "@/types/menu"
import { useDrag, useDrop, DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const DraggableMenuItem = ({
  item,
  depth,
  onToggle,
  onSelect,
  selectedId,
}: {
  item: MenuItem
  depth: number
  onToggle: (id: string) => void
  onSelect: (item: MenuItem) => void
  selectedId: string | null
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "MENU_ITEM",
    item: { id: item.id, depth },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isOver }, drop] = useDrop({
    accept: "MENU_ITEM",
    drop: () => {
      // Handle drop logic here
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  const hasChildren = item.children && item.children.length > 0
  const isSelected = selectedId === item.id

  return (
    <div ref={(node) => {
        drop(node)
      }}>
      <div
        ref={(node) => {
          drag(node)
        }}
        className={`flex items-center py-1 px-2 rounded cursor-pointer ${
          isDragging ? "opacity-50" : ""
        } ${isOver ? "bg-accent/50" : ""} ${isSelected ? "bg-[#84E538] text-[#14161F]" : "hover:bg-accent"}`}
        style={{ paddingLeft: `${depth * 20}px` }}
      >
        <div className="flex items-center flex-1" onClick={() => onSelect(item)}>
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation()
                onToggle(item.id)
              }}
            >
              {item.isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
          <span className="ml-1">{item.name}</span>
        </div>
      </div>
      {item.isExpanded && item.children && (
        <div className="ml-2">
          {item.children.map((child) => (
            <DraggableMenuItem
              key={child.id}
              item={child}
              depth={depth + 1}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface MenuTreeProps {
  onSelect: (item: MenuItem | null) => void
}

export function MenuTree({ onSelect }: MenuTreeProps) {
  const [menuData, setMenuData] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMenuData()
  }, [])

  const fetchMenuData = async () => {
    try {
      const response = await fetch("/api/menus")
      const data = await response.json()
      setMenuData(data)
    } catch (err) {
      setError(`Failed to load menu data: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const toggleExpand = (id: string) => {
    const toggleItem = (items: MenuItem[]): MenuItem[] => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, isExpanded: !item.isExpanded }
        }
        if (item.children) {
          return { ...item, children: toggleItem(item.children) }
        }
        return item
      })
    }
    setMenuData(toggleItem(menuData))
  }

  const expandAll = () => {
    const expandItems = (items: MenuItem[]): MenuItem[] => {
      return items.map((item) => ({
        ...item,
        isExpanded: true,
        children: item.children ? expandItems(item.children) : undefined,
      }))
    }
    setMenuData(expandItems(menuData))
  }

  const collapseAll = () => {
    const collapseItems = (items: MenuItem[]): MenuItem[] => {
      return items.map((item) => ({
        ...item,
        isExpanded: false,
        children: item.children ? collapseItems(item.children) : undefined,
      }))
    }
    setMenuData(collapseItems(menuData))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <div className="p-4 text-destructive">{error}</div>
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="border rounded-lg p-4">
        <div className="flex gap-2 mb-4">
          <Button variant="default" className="bg-[#14161F] text-white hover:bg-[#14161F]/90" onClick={expandAll}>
            Expand All
          </Button>
          <Button variant="outline" onClick={collapseAll}>
            Collapse All
          </Button>
        </div>
        <div className="mt-4">
          {menuData.map((item) => (
            <DraggableMenuItem
              key={item.id}
              item={item}
              depth={0}
              onToggle={toggleExpand}
              onSelect={(item) => {
                setSelectedId(item.id);
                onSelect(item);
              }}
              selectedId={selectedId}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  )
}

