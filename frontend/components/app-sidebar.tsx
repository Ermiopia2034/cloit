"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutGrid, ChevronDown, Loader2 } from "lucide-react"
import { useMenuStore } from "@/store/menuStore"
import { MenuItem } from "@/types/menu"

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

import { useSidebar } from "@/components/ui/sidebar"

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { openMobile, setOpenMobile } = useSidebar()
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [isSystemsOpen, setIsSystemsOpen] = React.useState(true)

  // Close mobile sidebar when clicking a link
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) { // lg breakpoint
      setOpenMobile(false)
    }
  }

  // Handle collapse button click differently for mobile and desktop
  const handleCollapseClick = () => {
    if (window.innerWidth < 1024) { // lg breakpoint
      setOpenMobile(false) // Close the sidebar on mobile
    } else {
      setIsCollapsed(!isCollapsed) // Toggle coll apse on desktop
    }
  }

  const { items, loading, error, fetchMenuItems, expandItem } = useMenuStore()

  React.useEffect(() => {
    fetchMenuItems()
  }, [])

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0
    
    return (
      <div key={item.id} className="space-y-1">
        <div
          className={cn(
            "flex items-center gap-x-2 px-3 py-2 text-sm",
            item.href && pathname === item.href
              ? "bg-[#475467] text-white"
              : "text-[#98A2B3] hover:bg-[#475467] hover:text-white",
            "rounded-lg cursor-pointer transition-colors"
          )}
          onClick={() => {
            if (hasChildren) {
              expandItem(item.id, !item.isExpanded)
            } else if (item.href) {
              handleLinkClick()
            }
          }}
        >
          {item.icon && React.createElement(item.icon, { className: "h-4 w-4" })}
          {!isCollapsed && (
            <>
              <span className="flex-1">{item.name}</span>
              {hasChildren && (
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    item.isExpanded && "rotate-180"
                  )}
                />
              )}
            </>
          )}
        </div>
        {hasChildren && item.isExpanded && !isCollapsed && item.children && (
          <div className="pl-4 space-y-1">
            {item.children.map((child: MenuItem) => renderMenuItem(child))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ease-in-out",
          openMobile ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpenMobile(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          "flex h-screen flex-col bg-[#101828] text-white rounded-[32px]",
          isCollapsed ? "w-16" : "w-64",
          "fixed lg:relative inset-y-0 z-50", // Fixed on mobile, relative on desktop
          "transition-all duration-300 ease-in-out",
          openMobile ? "left-0" : "-left-64 lg:left-0", // Slide out to the left on mobile
          "lg:flex", // Always flex on desktop
          className,
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {!isCollapsed && (
            <Link href="/" className="text-xl font-bold">
              CLOIT
            </Link>
          )}
          <button
            onClick={handleCollapseClick}
            className="p-2 hover:bg-[#475467] rounded-lg transition-colors"
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-[#98A2B3]" />
            </div>
          ) : error ? (
            <div className="text-sm text-red-500 px-3 py-2">{error}</div>
          ) : (
            <nav className="space-y-1">
              {items.map((item: MenuItem) => renderMenuItem(item))}
            </nav>
          )}
        </div>
      </div>
    </>
  )
}

