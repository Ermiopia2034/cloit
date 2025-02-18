"use client"

import { ChevronDown, ChevronRight, Grid, Plus } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MenuItem {
  id: string
  menuId: string
  name: string
  children?: MenuItem[]
  depth: number
  parentData?: string
}

const initialMenuData: MenuItem[] = [
  {
    id: "56320ee9-6af6-11ed-a7ba-f220afe5e4a9",
    menuId: "56320ee9-6af6-11ed-a7ba-f220afe5e4a9",
    name: "system management",
    depth: 1,
    children: [
      {
        id: "56321001-6af6-11ed-a7ba-f220afe5e4a9",
        menuId: "56321001-6af6-11ed-a7ba-f220afe5e4a9",
        name: "System Management",
        depth: 2,
        children: [
          {
            id: "56321002-6af6-11ed-a7ba-f220afe5e4a9",
            menuId: "56321002-6af6-11ed-a7ba-f220afe5e4a9",
            name: "Systems",
            depth: 3,
            children: [
              {
                id: "56321003-6af6-11ed-a7ba-f220afe5e4a9",
                menuId: "56321003-6af6-11ed-a7ba-f220afe5e4a9",
                name: "System Code",
                depth: 3,
                parentData: "Systems",
                children: [
                  {
                    id: "56321004-6af6-11ed-a7ba-f220afe5e4a9",
                    menuId: "56321004-6af6-11ed-a7ba-f220afe5e4a9",
                    name: "Code Registration",
                    depth: 4,
                  },
                ],
              },
              {
                id: "56321005-6af6-11ed-a7ba-f220afe5e4a9",
                menuId: "56321005-6af6-11ed-a7ba-f220afe5e4a9",
                name: "Code Registration - 2",
                depth: 3,
              },
              {
                id: "56321006-6af6-11ed-a7ba-f220afe5e4a9",
                menuId: "56321006-6af6-11ed-a7ba-f220afe5e4a9",
                name: "Properties",
                depth: 3,
              },
              {
                id: "56321007-6af6-11ed-a7ba-f220afe5e4a9",
                menuId: "56321007-6af6-11ed-a7ba-f220afe5e4a9",
                name: "Menus",
                depth: 3,
                children: [
                  {
                    id: "56321008-6af6-11ed-a7ba-f220afe5e4a9",
                    menuId: "56321008-6af6-11ed-a7ba-f220afe5e4a9",
                    name: "Menu Registration",
                    depth: 4,
                  },
                ],
              },
              {
                id: "56321009-6af6-11ed-a7ba-f220afe5e4a9",
                menuId: "56321009-6af6-11ed-a7ba-f220afe5e4a9",
                name: "API List",
                depth: 3,
                children: [
                  {
                    id: "56321010-6af6-11ed-a7ba-f220afe5e4a9",
                    menuId: "56321010-6af6-11ed-a7ba-f220afe5e4a9",
                    name: "API Registration",
                    depth: 4,
                  },
                  {
                    id: "56321011-6af6-11ed-a7ba-f220afe5e4a9",
                    menuId: "56321011-6af6-11ed-a7ba-f220afe5e4a9",
                    name: "API Edit",
                    depth: 4,
                  },
                ],
              },
              {
                id: "56321012-6af6-11ed-a7ba-f220afe5e4a9",
                menuId: "56321012-6af6-11ed-a7ba-f220afe5e4a9",
                name: "Users & Groups",
                depth: 3,
                children: [
                  {
                    id: "56321013-6af6-11ed-a7ba-f220afe5e4a9",
                    menuId: "56321013-6af6-11ed-a7ba-f220afe5e4a9",
                    name: "Users",
                    depth: 4,
                    children: [
                      {
                        id: "56321014-6af6-11ed-a7ba-f220afe5e4a9",
                        menuId: "56321014-6af6-11ed-a7ba-f220afe5e4a9",
                        name: "User Account Registration",
                        depth: 5,
                      },
                    ],
                  },
                  {
                    id: "56321015-6af6-11ed-a7ba-f220afe5e4a9",
                    menuId: "56321015-6af6-11ed-a7ba-f220afe5e4a9",
                    name: "Groups",
                    depth: 4,
                    children: [
                      {
                        id: "56321016-6af6-11ed-a7ba-f220afe5e4a9",
                        menuId: "56321016-6af6-11ed-a7ba-f220afe5e4a9",
                        name: "User Group Registration",
                        depth: 5,
                      },
                    ],
                  },
                  {
                    id: "56321017-6af6-11ed-a7ba-f220afe5e4a9",
                    menuId: "56321017-6af6-11ed-a7ba-f220afe5e4a9",
                    name: "사용자 승인",
                    depth: 4,
                    children: [
                      {
                        id: "56321018-6af6-11ed-a7ba-f220afe5e4a9",
                        menuId: "56321018-6af6-11ed-a7ba-f220afe5e4a9",
                        name: "사용자 승인 상세",
                        depth: 5,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

const getParentName = (items: MenuItem[], targetId: string, parentName = ""): string => {
  for (const item of items) {
    if (item.id === targetId) return parentName
    if (item.children) {
      const found = getParentName(item.children, targetId, item.name)
      if (found) return found
    }
  }
  return ""
}

export default function MenuSystem() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set([
      "56320ee9-6af6-11ed-a7ba-f220afe5e4a9",
      "56321001-6af6-11ed-a7ba-f220afe5e4a9",
      "56321002-6af6-11ed-a7ba-f220afe5e4a9",
    ]),
  )
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const expandAll = () => {
    const allIds = getAllItemIds(initialMenuData)
    setExpandedItems(new Set(allIds))
  }

  const collapseAll = () => {
    setExpandedItems(new Set())
  }

  const getAllItemIds = (items: MenuItem[]): string[] => {
    return items.reduce((acc: string[], item) => {
      acc.push(item.id)
      if (item.children) {
        acc.push(...getAllItemIds(item.children))
      }
      return acc
    }, [])
  }

  const renderMenuItem = (item: MenuItem, level = 0, isLastItem = false) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)

    return (
      <div key={item.id} className="relative group">
        <div
          className={`flex items-center py-1.5 hover:bg-gray-50 cursor-pointer ${
            selectedItem?.id === item.id ? "bg-gray-50" : ""
          }`}
          style={{ paddingLeft: `${level * 20}px` }}
          onClick={() => {
            setSelectedItem({
              ...item,
              parentData: getParentName(initialMenuData, item.id),
            })
            if (hasChildren) {
              toggleItem(item.id)
            }
          }}
        >
          {level > 0 && (
            <>
              {/* Vertical line from parent */}
              <div
                className="absolute border-l border-gray-200"
                style={{
                  left: `${(level - 1) * 20 + 12}px`,
                  top: "-1px", // Extend slightly up to connect with parent
                  bottom: isLastItem && !hasChildren ? "50%" : "0",
                }}
              />
              {/* Horizontal line to item */}
              <div
                className="absolute border-t border-gray-200"
                style={{
                  left: `${(level - 1) * 20 + 12}px`,
                  width: "8px",
                  top: "50%",
                }}
              />
              {/* Vertical line continuation for items with children */}
              {hasChildren && isExpanded && (
                <div
                  className="absolute border-l border-gray-200"
                  style={{
                    left: `${level * 20 + 12}px`,
                    top: "50%",
                    bottom: "-1px", // Extend slightly down to connect with children
                  }}
                />
              )}
            </>
          )}
          <div className="flex items-center relative z-10">
            {hasChildren ? (
              <button className="p-1">
                {isExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
                )}
              </button>
            ) : (
              <span className="w-6" />
            )}
            <span className="ml-1 text-sm text-gray-900">{item.name}</span>
            {item.name === "System Code" && (
              <Button variant="ghost" size="icon" className="ml-auto h-6 w-6 opacity-70 hover:opacity-100">
                <Plus className="h-3.5 w-3.5 text-gray-500" />
              </Button>
            )}
          </div>
        </div>
        {hasChildren && isExpanded && item.children && (
          <div className="relative">
            {(() => {
              const childrenLength = item.children.length;
              return item.children.map((child, index) => (
                <div key={child.id}>{renderMenuItem(child, level + 1, index === childrenLength - 1)}</div>
              ));
            })()}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white">
      <div className="w-full lg:w-1/2 lg:border-r border-gray-200 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Grid className="h-5 w-5 text-gray-400" />
            <h1 className="text-lg font-medium text-gray-900">Menus</h1>
          </div>
          <div className="text-sm text-gray-500 mb-3">Menu</div>
          <div className="relative">
            <Input
              placeholder="system management"
              className="pl-3 h-10 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-gray-200"
            />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="p-6">
          <div className="flex gap-2 mb-6">
            <Button
              variant="default"
              size="sm"
              onClick={expandAll}
              className="bg-[#1C1C1C] hover:bg-[#2C2C2C] text-white rounded-full px-4 py-2 text-sm font-medium"
            >
              Expand All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={collapseAll}
              className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 rounded-full px-4 py-2 text-sm font-medium"
            >
              Collapse All
            </Button>
          </div>
          <div className="space-y-0.5">
            {initialMenuData.map((item, index) => renderMenuItem(item, 0, index === initialMenuData.length - 1))}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 p-6 lg:p-12 border-t lg:border-t-0 border-gray-200">
        {selectedItem && (
          <div className="max-w-[440px]">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-normal text-gray-500">Menu ID</Label>
                <Input
                  value={selectedItem.menuId}
                  readOnly
                  className="bg-white border border-gray-100 rounded-md h-10 px-3 text-gray-600 w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-normal text-gray-500">Depth</Label>
                <Input
                  value={selectedItem.depth.toString()}
                  readOnly
                  className="bg-gray-100 border border-gray-100 rounded-md h-10 px-3 text-gray-600 w-[220px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-normal text-gray-500">Parent Data</Label>
                <Input
                  value={selectedItem.parentData || ""}
                  readOnly
                  className="bg-white border border-gray-100 rounded-md h-10 px-3 text-gray-600 w-[220px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-normal text-gray-500">Name</Label>
                <Input
                  value={selectedItem.name}
                  readOnly
                  className="bg-white border border-gray-100 rounded-md h-10 px-3 text-gray-600 w-[220px]"
                />
              </div>
              <div className="w-[220px]">
                <Button className="w-full bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-full h-10">Save</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

