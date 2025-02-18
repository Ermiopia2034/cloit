"use client"

import dynamic from "next/dynamic"

const MenuSystem = dynamic(() => import("@/components/menu-system"), {
  ssr: false,
})

export default function MenusPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menus</h1>
      <p className="mb-6">Manage system menus and navigation here.</p>
      <div className="bg-white rounded-lg shadow p-6">
        <MenuSystem />
      </div>
    </div>
  )
}
