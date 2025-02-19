import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuService {
  private prisma = new PrismaClient();

  async findAll() {
    return this.prisma.menuItem.findMany({
      include: {
        children: true
      }
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
}
