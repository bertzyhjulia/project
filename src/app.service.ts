import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { from, Observable } from 'rxjs';
import { Like, Repository } from 'typeorm';
import { CreateClientDto, FilterDto } from './client.dto';
import { Client } from './entity/client.entity';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  getFiltering(
    options: IPaginationOptions,
    filter: FilterDto,
  ): Observable<Pagination<Client>> {
    console.log(options);
    return from(
      this.clientRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 2,
        order: { id: 'ASC' },
        select: ['id', 'name', 'lastName', 'email'],
        where: [
          {
            name: Like(`%${filter.name}%`),
            lastName: Like(`%${filter.lastName}%`),
          },
        ],
      }),
    ).pipe(
      map(([clients, totalClients]) => {
        const clientsPageable: Pagination<Client> = {
          items: clients,
          links: {
            first: options.route + `limit=${options.limit}`,
            previous:
              options.route +
              `limit=${options.limit}&page=${Number(options.page) - 1}`,
            next:
              options.route +
              `limit=${options.limit}&page=${Number(options.page) + 1}`,
            last:
              options.route +
              `limit=${options.limit}&page=${Math.ceil(
                totalClients / Number(options.limit) - 1,
              )}`,
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: clients.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalClients,
            totalPages: Math.ceil(totalClients / Number(options.limit)),
          },
        };
        console.log(clientsPageable);
        return clientsPageable;
      }),
    );
  }

  getAll(options: IPaginationOptions): Observable<Pagination<Client>> {
    console.log(options);
    return from(
      this.clientRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 2,
        order: { id: 'ASC' },
        select: ['id', 'name', 'lastName', 'email'],
      }),
    ).pipe(
      map(([clients, totalClients]) => {
        const clientsPageable: Pagination<Client> = {
          items: clients,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous:
              options.route +
              `?limit=${options.limit}&page=${Number(options.page) - 1}`,
            next:
              options.route +
              `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last:
              options.route +
              `?limit=${options.limit}&page=${Math.ceil(
                totalClients / Number(options.limit) - 1,
              )}`,
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: clients.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalClients,
            totalPages: Math.ceil(totalClients / Number(options.limit)),
          },
        };
        return clientsPageable;
      }),
    );
  }

  async createClient(createDto: CreateClientDto) {
    return await this.clientRepository.create(createDto);
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
