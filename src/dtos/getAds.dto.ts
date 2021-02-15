import { IsArray, IsNumberString, IsString } from 'class-validator';

export class GetAdsDto {
  @IsNumberString()
  public lat!: number;

  @IsNumberString()
  public long!: number;

  @IsString()
  public browser!: string;

  @IsString()
  public os!: string;

  @IsArray()
  public tag!: string[];
}
