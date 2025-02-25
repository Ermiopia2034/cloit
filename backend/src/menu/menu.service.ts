import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { SaveMenuDto } from './dto/save-menu.dto';

@Injectable()
export class MenuService {
  private prisma = new PrismaClient();

  async findAll(depth: number = 10) {
    const includeChildren = (level: number): any => 
      level > 0 ? { include: { children: includeChildren(level - 1) } } : {};

    return this.prisma.menuItem.findMany({
      where: { parentId: null }, // Only fetch root level items
      include: { children: includeChildren(depth) }
    });
  }
  async findOne(id: string, depth?: number) {
    const includeChildren = (level: number): any => 
      level > 0 ? { include: { children: includeChildren(level - 1) } } : {};

    return this.prisma.menuItem.findUnique({
      where: { id },
      include: depth !== undefined ? { children: includeChildren(depth) } : {}
    });
  }
  async create(dto: CreateMenuItemDto) {
    return this.prisma.menuItem.create({
      data: {
        label: dto.label,
        url: dto.url,
        parentId: dto.parentId
      }
    });
  }

  async update(id: string, dto: UpdateMenuItemDto) {
    return this.prisma.menuItem.update({
      where: { id },
      data: {
        label: dto.label,
        url: dto.url,
        parentId: dto.parentId
      }
    });
  }

  async remove(id: string) {
    return this.prisma.menuItem.delete({
      where: { id }
    });
  }

  async saveMenu(dto: SaveMenuDto) {
    // Use a transaction to ensure all operations succeed or fail together
    return this.prisma.$transaction(async (prisma) => {
      // First, get all existing menu items
      const existingItems = await prisma.menuItem.findMany();
      
      // Create a map of all items in the DTO for easy lookup
      const dtoItemsMap = new Map(dto.items.map(item => [item.id, item]));
      
      // Items to update (exist in both DTO and database)
      const itemsToUpdate = existingItems.filter(item => dtoItemsMap.has(item.id));
      
      // Items to delete (exist in database but not in DTO)
      const itemsToDelete = existingItems.filter(item => !dtoItemsMap.has(item.id));
      
      // Items to create (exist in DTO but not in database)
      const existingIds = new Set(existingItems.map(item => item.id));
      const itemsToCreate = dto.items.filter(item => !existingIds.has(item.id));
      
      // Delete items that are no longer needed
      for (const item of itemsToDelete) {
        await prisma.menuItem.delete({
          where: { id: item.id }
        });
      }
      
      // Update existing items
      for (const item of itemsToUpdate) {
        const dtoItem = dtoItemsMap.get(item.id);
        if (dtoItem) {
          await prisma.menuItem.update({
            where: { id: item.id },
            data: {
              label: dtoItem.label,
              url: dtoItem.url,
              parentId: dtoItem.parentId
            }
          });
        }
      }
      
      // Create new items
      for (const item of itemsToCreate) {
        await prisma.menuItem.create({
          data: {
            id: item.id,
            label: item.label,
            url: item.url,
            parentId: item.parentId
          }
        });
      }
      
      // Return the updated menu structure
      return this.findAll();
    });
  }
}
