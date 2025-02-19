import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  label: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsString()
  @IsOptional()
  parentId?: string;
}