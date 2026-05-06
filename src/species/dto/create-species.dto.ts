import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';

export class CreateSpeciesDto {
  @IsString()
  @IsNotEmpty()
  commonName: string;

  @IsString()
  @IsNotEmpty()
  scientificName: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsOptional()
  @IsBoolean()
  fetchClimate?: boolean;
}