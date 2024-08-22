export class CreateUserRequestDto {
  readonly email: string;
  readonly password: string;
  readonly roles: string[];
}
