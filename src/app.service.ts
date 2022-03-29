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
    let res;
    if (filter.name)
      res = await this.clientRepository.find({
        order: { id: 'ASC' },
        select: ['id', 'name', 'lastName', 'email', 'tel', 'date', 'avatar'],
        skip: (filter.page - 1) * filter.limit || 0,
        take: filter.limit || 5,
        where: [
          {
            name: Like(`%${filter.name}%`),
          },
        ],
      });
    if (filter.lastName)
      res = await this.clientRepository.find({
        order: { id: 'ASC' },
        select: ['id', 'name', 'lastName', 'email', 'tel', 'date', 'avatar'],
        skip: filter.page * filter.limit,
        where: [
          {
            lastName: Like(`%${filter.lastName}%`),
          },
        ],
      });
    if (filter.email)
      res = await this.clientRepository.find({
        order: { id: 'ASC' },
        select: ['id', 'name', 'lastName', 'email', 'tel', 'date', 'avatar'],
        skip: filter.page * filter.limit,
        where: [
          {
            email: Like(`%${filter.email}%`),
          },
        ],
      });
    if (filter.tel)
      res = await this.clientRepository.find({
        order: { id: 'ASC' },
        select: ['id', 'name', 'lastName', 'email', 'tel', 'date', 'avatar'],
        skip: filter.page * filter.limit,
        where: [
          {
            tel: Like(`%${filter.tel}%`),
          },
        ],
      });
    if (filter.date)
      res = await this.clientRepository.find({
        order: { id: 'ASC' },
        select: ['id', 'name', 'lastName', 'email', 'tel', 'date', 'avatar'],
        skip: filter.page * filter.limit,
        where: [
          {
            date: Like(`%${filter.date}%`),
          },
        ],
      });
    return res;
  }

  public findAll(query: PaginateQuery): Promise<Paginated<Client>> {
    return paginate(query, this.clientRepository, {
      sortableColumns: [
        'id',
        'name',
        'lastName',
        'tel',
        'email',
        'date',
        'avatar',
      ],
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

  async edit(createDto: CreateClientDto) {
    return await this.clientRepository.save(createDto);
  }
  async getOne(id: string) {
    return await this.clientRepository.findOne(id);
  }
  async delete(id: string) {
    return await this.clientRepository.delete(id);
  }
}
