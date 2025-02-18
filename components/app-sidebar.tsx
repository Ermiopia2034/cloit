"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutGrid, Code2, Settings2, Grid2X2, FileJson, Users2, Trophy, Menu, ChevronDown } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [isSystemsOpen, setIsSystemsOpen] = React.useState(true)

  const navItems = [
    {
      title: "Systems",
      icon: LayoutGrid,
      isExpandable: true,
      children: [
        {
          title: "System Code",
          href: "/systems/code",
          icon: Code2,
        },
        {
          title: "Properties",
          href: "/systems/properties",
          icon: Settings2,
        },
        {
          title: "Menus",
          href: "/systems/menus",
          icon: Grid2X2,

        },
        {
          title: "APIList",
          href: "/systems/api-list",
          icon: FileJson,
        },
      ],
    },
    {
      title: "Users & Group",
      href: "/users",
      icon: Users2,
    },
    {
      title: "Competition",
      href: "/competition",
      icon: Trophy,
    },
  ]

  return (
    <div
      className={cn(
        "flex h-screen flex-col bg-[#101828] text-white transition-all duration-300 rounded-[32px]",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!isCollapsed && (
          <Link href="/" className="text-xl font-bold">
            CLOIT
          </Link>
        )}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="rounded-xl p-2 hover:bg-white/10">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => (
          <div key={item.title}>
            {item.isExpandable ? (
              <div>
                <button
                  onClick={() => setIsSystemsOpen(!isSystemsOpen)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-gray-400 hover:bg-white/10 hover:text-white",
                    isSystemsOpen && "text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform duration-200", isSystemsOpen && "rotate-180")}
                    />
                  )}
                </button>
                {!isCollapsed && item.children && isSystemsOpen && (
                  <div className="mt-1 space-y-1 rounded-xl bg-[#1D2939] p-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2",
pathname === child.href
                            ? "bg-[#9FEF00] text-black"
                            : "text-gray-400 hover:bg-white/10 hover:text-white",
                        )}
                      >
                        <child.icon className="h-4 w-4" />
                        <span>{child.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href || "#"}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2",
                  pathname === item.href
                    ? "bg-[#9FEF00] text-black"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}

