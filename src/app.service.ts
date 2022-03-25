import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Like, Repository } from 'typeorm';
import { CreateClientDto, FilterDto } from './client.dto';
import { Client } from './entity/client.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}
  async getCountClient() {
    const clients = await this.clientRepository.find();
    let count = 0;
    for (let i = 0; i < clients.length; i++) count++;
    return count;
  }

  async getFiltering(filter: FilterDto) {
    return await this.clientRepository.find({
      order: { id: 'ASC' },
      select: ['id', 'name', 'lastName', 'email', 'tel', 'date', 'avatar'],
      skip: 0,
      where: [
        {
          name: Like(`%${filter.name}%`),
          lastName: Like(`%${filter.lastName}%`),
          email: Like(`%${filter.email}%`),
          tel: Like(`%${filter.tel}%`),
          date: Like(`%${filter.date}%`),
        },
      ],
    });
  }

  public findAll(query: PaginateQuery): Promise<Paginated<Client>> {
    return paginate(query, this.clientRepository, {
      sortableColumns: ['id', 'name', 'lastName', 'tel', 'email', 'date', 'avatar'],
      searchableColumns: ['name', 'lastName', 'tel', 'email', 'date', 'avatar'],
      defaultSortBy: [['id', 'ASC']],
      filterableColumns: {
        //id: [FilterOperator.GTE, FilterOperator.LTE],
      },
    });
  }

  async createClient(createDto: CreateClientDto) {
    const client = await this.clientRepository.create(createDto);
    return await this.clientRepository.save(client);
  }

  async addAvatarClient(createDto: CreateClientDto) {
    return await this.clientRepository.save(createDto);
  }
  async getOne(id: string) {
    return await this.clientRepository.findOne(id);

  }
  async delete(id: string) {
    return await this.clientRepository.delete(id);
  }


}
