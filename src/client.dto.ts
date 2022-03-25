import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly lastName: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly tel: number;
  @ApiProperty()
  readonly date: number;
  @ApiProperty({
    required: false,
    default: '',
  })
  readonly avatar: string;
}

export class EditClientDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly lastName: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly tel: number;
  @ApiProperty()
  readonly date: Date;
}

export class FilterDto {
  @ApiProperty({
    required: false,
    default: '',
  })
  readonly name: string;
  @ApiProperty({
    required: false,
    default: '',
  })
  readonly lastName: string;
  @ApiProperty({
    required: false,
    default: '',
  })
  readonly email: string;
  @ApiProperty({
    required: false,
    default: '',
  })
  readonly tel: number;
  @ApiProperty({
    required: false,
    default: '',
  })
  readonly date: Date;
}
export class PaginatedClient<Client> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  results: Client[];
}
