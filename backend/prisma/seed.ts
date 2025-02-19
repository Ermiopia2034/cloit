import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.menuItem.deleteMany()

  // Create root menu item
  await prisma.menuItem.create({
    data: {
      label: "system management",
      url: "/systems",
      children: {
        create: [
          {
            label: "System Management",
            url: "/systems/management",
            children: {
              create: [
                {
                  label: "Systems",
                  url: "/systems",
                  children: {
                    create: [
                      {
                        label: "System Code",
                        url: "/systems/code",
                        children: {
                          create: [
                            {
                              label: "Code Registration",
                              url: "/systems/code/registration"
                            },
                            {
                              label: "Code Registration - 2",
                              url: "/systems/code/registration-2"
                            }
                          ]
                        }
                      },
                      {
                        label: "Properties",
                        url: "/systems/properties"
                      },
                      {
                        label: "Menus",
                        url: "/systems/menus",
                        children: {
                          create: [
                            {
                              label: "Menu Registration",
                              url: "/systems/menus/registration"
                            }
                          ]
                        }
                      },
                      {
                        label: "API List",
                        url: "/systems/api",
                        children: {
                          create: [
                            {
                              label: "API Registration",
                              url: "/systems/api/registration"
                            },
                            {
                              label: "API Edit",
                              url: "/systems/api/edit"
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })