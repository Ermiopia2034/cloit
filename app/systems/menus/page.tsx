"use client"

import dynamic from "next/dynamic"
import { PageHeader } from "@/components/page-header"

const MenuSystem = dynamic(() => import("@/components/menu-system"), {
  ssr: false,
})

export default function MenusPage() {
  return (
    <div className="p-6">
      <PageHeader 
        title="Menus"
        description="Manage system menus and navigation here."
      />
      <div className="bg-white rounded-lg shadow p-6">
        <MenuSystem />
      </div>
    </div>
  )
}
