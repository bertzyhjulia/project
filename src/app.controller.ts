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
  UseGuards,
  Request,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import path = require('path');
import { map, Observable, of, tap } from 'rxjs';
import { AppService } from './app.service';
import { CreateClientDto, FilterDto } from './client.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from './auth/jwt-guard';
import { Client } from './entity/client.entity';
@ApiTags('/swagger')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiProperty()
  @Get('')
  @Render('index')
  async get(@Paginate() query: PaginateQuery) {
    const result = await this.appService.findAll(query);
    return { result };
  }

  @ApiProperty()
  @Get('/paginate')
  @Render('')
  async paginatePage(@Paginate() query: PaginateQuery) {
    const result = await this.appService.findAll(query);
    return { result };
  }

  @ApiProperty()
  @Get('/count')
  @Render('')
  async getCount() {
    const count = await this.appService.getCountClient();
    console.log(count);
    return { count };
  }

  @ApiProperty()
  @Post('/filter')
  @Render('')
  async postFilter(@Body() filter: FilterDto) {
    console.log(filter);
    const result = await this.appService.getFiltering(filter);
    console.log(result);
    return { result };
  }

  @ApiProperty()
  @Post('/clientAdd')
  @Render('')
  async createClient(@Body() createDto: CreateClientDto) {
    const createClient = await  this.appService.createClient(createDto);
    return { createClient };
  }

  // @Get('/getEditCient:id')
  // async getInfoToEdit(@Res() res: Response, @Param('id') id: string) {
  //   return res.render(
  //     this.appService.getInfoForEditClient(id),
  //     { ids: '5'}
  //   );
  // }

  @ApiProperty()
  @Delete('/delete:id')
  @Render('')
  async deleteClient(@Param('id') id: string) {
    return await this.appService.delete(id);
  }

  @ApiProperty()
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads/profileimagies',
        filename: (req, file, cb) => {
          const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;

          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  async uploadFile(@Body() createDto: CreateClientDto, @UploadedFile() file: Express.Multer.File,) {
    const createClient = await  this.appService.createClient(createDto);
    createClient.avatar = file.path;
    const avatarClient = await  this.appService.addAvatarClient(createClient);
    
    return {
      avatarClient,
    };
  }

}
