import { IsArray, IsString, IsOptional, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MenuItemDto {
  @IsString()
  id: string;

  @IsString()
  label: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsString()
  @IsOptional()
  parentId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuItemDto)
  children?: MenuItemDto[];
}

export class SaveMenuDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuItemDto)
  items: MenuItemDto[];
}
