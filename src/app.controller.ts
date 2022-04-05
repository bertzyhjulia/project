import {
  Get,
  Controller,
  Render,
  Post,
  Body,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import path = require('path');
import { AppService } from './app.service';
import { CreateClientDto, FilterDto } from './client.dto';
import { v4 as uuidv4 } from 'uuid';

export const storage = {
  storage: diskStorage({
    destination: 'dist/uploads/profileimagies',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};
@ApiTags('/swagger')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiProperty()
  @Get('/')
  @Render('page/index')
  async paginatePage(@Paginate() query: PaginateQuery) {
    const result = await this.appService.findAll(query);
    return { result };
  }

  @ApiProperty()
  @Get('/count')
  @Render('page/index')
  async getCount() {
    const count = await this.appService.getCountClient();
    console.log(count);
    return { count };
  }

  @ApiProperty()
  @Get('/filter')
  @Render('')
  async Filter(@Query() filter: FilterDto) {
    console.log(filter);
    const result = await this.appService.getFiltering(filter);
    console.log(result);
    return { result };
  }

  @ApiProperty()
  @Patch('/clientEdit/:id')
  @Render('')
  async editClient(
    @Param('id') id: string,
    @Body() { name, lastName, tel, email, date },
  ) {
    const client = await this.appService.getOne(id);
    client.name = name;
    client.lastName = lastName;
    client.tel = tel;
    client.email = email;
    client.date = date;
    const editClient = await this.appService.edit(client);
    return { editClient };
  }

  @ApiProperty()
  @Delete('/delete:id')
  @Render('')
  async deleteClient(@Param('id') id: string) {
    return await this.appService.delete(id);
  }

  @ApiProperty()
  @Post('clientAdd')
  @UseInterceptors(FileInterceptor('avatar', storage))
  async uploadFile(
    @Body() createDto: CreateClientDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    console.log(avatar + '555');
    const createClient = await this.appService.createClient(createDto);
    createClient.avatar = avatar.path;
    const newClient = await this.appService.edit(createClient);
    return { newClient };
  }

  @ApiProperty()
  @Patch('edit/:id')
  @UseInterceptors(FileInterceptor('avatar', storage))
  async uploadFile1(
    @Param('id') id: string,
    @Body() { name, lastName, tel, email, date },
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    const client = await this.appService.getOne(id);
    client.name = name;
    client.lastName = lastName;
    client.tel = tel;
    client.email = email;
    client.date = date;
    client.avatar = avatar.path;
    const editClient = await this.appService.edit(client);
    return { editClient };
  }
}
