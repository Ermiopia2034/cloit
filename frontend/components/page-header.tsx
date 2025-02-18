"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  const { openMobile, setOpenMobile } = useSidebar()

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpenMobile(!openMobile)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="mt-1 text-gray-500">{description}</p>}
        </div>
      </div>
    </div>
  )
}
