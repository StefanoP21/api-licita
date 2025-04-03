import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateOpportunityDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  code: string;

  @IsNotEmpty()
  @IsString()
  title: string;

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
