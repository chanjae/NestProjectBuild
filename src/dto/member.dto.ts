import { IsString, IsNumber } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsNumber()
  cokili_identification_number: number;
  @IsString()
  cokili_email: string;
  @IsString()
  password: string;
}

export class UpdateMemberDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsNumber()
  idx: number;
}

export class LoginMemberDto {
  @IsString()
  cokili_email: string;
  @IsString()
  password: string;
}
