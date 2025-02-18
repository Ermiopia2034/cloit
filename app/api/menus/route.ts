import { NextResponse } from "next/server"
import type { MenuItem } from "@/types/menu"

// This would typically come from a database
let menuData: MenuItem[] = [
  {
    id: "1",
    name: "system management",
    children: [
      {
        id: "2",
        name: "System Management",
        children: [
          {
            id: "3",
            name: "Systems",
            children: [
              {
                id: "4",
                name: "System Code",
                children: [
                  { id: "5", name: "Code Registration" },
                  { id: "6", name: "Code Registration - 2" },
                ],
              },
              {
                id: "7",
                name: "Properties",
              },
              {
                id: "8",
                name: "Menus",
                children: [{ id: "9", name: "Menu Registration" }],
              },
              {
                id: "10",
                name: "API List",
                children: [
                  { id: "11", name: "API Registration" },
                  { id: "12", name: "API Edit" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

export async function GET() {
  return NextResponse.json(menuData)
}

export async function POST(req: Request) {
  const data = await req.json()
  menuData = data
  return NextResponse.json({ success: true })
}

export async function PATCH(req: Request) {
  const data = await req.json()
  const updateMenu = (items: MenuItem[], id: string, updates: Partial<MenuItem>): MenuItem[] => {
    return items.map((item) => {
      if (item.id === id) {
        return { ...item, ...updates }
      }
      if (item.children) {
        return { ...item, children: updateMenu(item.children, id, updates) }
      }
      return item
    })
  }

  menuData = updateMenu(menuData, data.id, data.updates)
  return NextResponse.json({ success: true })
}

