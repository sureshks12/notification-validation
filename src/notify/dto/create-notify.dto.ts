import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateNotifyDTO {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsInt()
  @Min(1)
  priority: number;

  @IsNotEmpty()
  @IsString()
  merchant: string;

  @IsNotEmpty()
  @IsString()
  outlet: string;
}
