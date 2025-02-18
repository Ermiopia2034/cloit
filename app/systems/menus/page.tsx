"use client"

import dynamic from "next/dynamic"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

const MenuSystem = dynamic(() => import("@/components/menu-system"), {
  ssr: false,
})

export default function MenusPage() {
  const { openMobile, setOpenMobile } = useSidebar()

  return (
    <div className="p-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden mb-4"
        onClick={() => setOpenMobile(!openMobile)}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <h1 className="text-2xl font-bold mb-4">Menus</h1>
      <p className="mb-6">Manage system menus and navigation here.</p>
      <div className="bg-white rounded-lg shadow p-6">
        <MenuSystem />
      </div>
    </div>
  )
}
