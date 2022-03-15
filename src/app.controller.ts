import { Get, Controller, Render, Post, Body, Delete, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateClientDto } from './client.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @Render('index')
  async get() {
    const result = await this.appService.get10Client();
    return { result };
  }

  @Post('/clientAdd')
  @Render('index')
  async createClient(@Body() createDto: CreateClientDto) {
    const createClient = await this.appService.createClient(createDto);
    return { createClient };
  }

  @Delete('/delete:id')
  @Render('index')
  async deleteClient(@Param('id') id: string) {
    return await this.appService.delete(id);
  }
}
