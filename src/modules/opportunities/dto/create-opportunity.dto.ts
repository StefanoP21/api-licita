import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { TypeEnum } from '../models/opportunities.model';

export class CreateOpportunityDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  code: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(TypeEnum)
  type: TypeEnum;

  @IsNotEmpty()
  @IsBoolean()
  is_followed: boolean;

  @IsNotEmpty()
  @IsDate()
  publish_date: Date;

  @IsNotEmpty()
  @IsDate()
  close_date: Date;
}
