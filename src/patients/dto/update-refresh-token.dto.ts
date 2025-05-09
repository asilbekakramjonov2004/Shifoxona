import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateRefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  hashed_refresh_token: string;
}
