import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './client.dto';
import { Client } from './entity/client.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}
  async get10Client() {
    return await this.clientRepository.find();
  }
  async createClient(createDto: CreateClientDto) {
    const client = await this.clientRepository.create(createDto);
    return await this.clientRepository.save(client);
  }
}
