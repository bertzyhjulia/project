export class CreateClientDto {
  readonly name: string;

  readonly lastName: string;

  readonly email: string;

  readonly tel: number;

  readonly date: Date;

  readonly avatar: string;
}

export class EditClientDto {
  readonly name: string;

  readonly lastName: string;

  readonly email: string;

  readonly tel: number;

  readonly date: Date;

  readonly avatar: string;
}

export class FilterDto {
  name: string;

  lastName: string;

  email: string;

  tel: number;

  date: Date;
}
