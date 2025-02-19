import { IsString, IsOptional } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  label: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  parentId?: string;
}