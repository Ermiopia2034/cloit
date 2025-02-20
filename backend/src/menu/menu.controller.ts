import { Controller } from '@nestjs/common';
import { Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // Get full menu hierarchy
  @Get()
  async getFullMenu() {
    return this.menuService.findAll();
  }

  // Get specific menu with depth
  @Get(':id')
  async getMenuWithDepth(
    @Param('id') id: string,
    @Query('depth') depth?: number
  ) {
    const menu = await this.menuService.findOne(id, depth);
    if (!menu) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
    return menu;
  }

  // Add item to last layer
  @Post()
  async addItem(@Body() dto: CreateMenuItemDto) {
    return this.menuService.create(dto);
  }

  @Patch(':id')
  async updateItem(
    @Param('id') id: string,
    @Body() dto: UpdateMenuItemDto
  ) {
    const menu = await this.menuService.update(id, dto);
    if (!menu) {
      throw new NotFoundException(`Menu items with ID ${id} not found`);
    }
    return menu;
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string) {
    const menu = await this.menuService.remove(id);
    if (!menu) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
    return menu;
  }
}
