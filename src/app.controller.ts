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
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import path = require('path');
import { AppService } from './app.service';
import { CreateClientDto, EditClientDto } from './client.dto';
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';
import { join } from 'path';

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
  get(@Query('page') page = 0, @Query('limit') limit = 2) {
    return this.appService.getAll({
      page: Number(page),
      limit: Number(limit),
      route: 'http://localhost:3000/paginate',
    });
  }

  @ApiProperty()
  @Get('/paginate')
  @Render('')
  async getAllOrFiltering(
    @Query('page') page = 0,
    @Query('limit') limit = 2,
    @Query('name') name: string,
    @Query('lastName') lastName: string,
    @Query('email') email: string,
    @Query('tel') tel: number,
    @Query('date') date: Date,
  ) {
    limit = limit > 100 ? 100 : limit;
    if (
      name == null ||
      name == undefined ||
      lastName == null ||
      lastName == undefined ||
      tel == null ||
      tel == undefined ||
      date == null ||
      date == undefined ||
      email == null ||
      email == undefined
    ) {
      return this.appService.getAll({
        page: Number(page),
        limit: Number(limit),
        route: 'http://localhost:3000/paginate',
      });
    } else {
      return await this.appService.getFiltering(
        {
          page: Number(page),
          limit: Number(limit),
          route:
            `http://localhost:3000/paginate?name=` +
            name +
            `&lastName=` +
            lastName +
            `&tel=` +
            tel +
            `&email=` +
            email +
            `&date=` +
            date +
            `&`,
        },
        { name, lastName, email, tel, date },
      );
    }
  }

  @ApiProperty()
  @Get('/:id')
  @Render('')
  async getOneClient(@Param('id') id: string) {
    const oneClient = await this.appService.getOne(id);
    return { oneClient };
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
    const createClient = await this.appService.createClient(createDto);
    createClient.avatar = avatar.filename;
    const newClient = await this.appService.edit(createClient);
    return { newClient };
  }

  @ApiProperty()
  @Patch('editWithoutAvatar:id')
  @UseInterceptors(FileInterceptor('avatar', storage))
  async editWithoutAvatar(
    @Param('id') id: string,
    @Body() editDto: EditClientDto,
  ) {
    console.log(editDto);
    const client = await this.appService.getOne(id);
    client.name = editDto.name;
    client.lastName = editDto.lastName;
    client.tel = editDto.tel;
    client.email = editDto.email;
    client.date = editDto.date;
    console.log(client);
    const editClient = await this.appService.edit(client);
    return { editClient };
  }

  @ApiProperty()
  @Patch('editWithAvatar:id')
  @UseInterceptors(FileInterceptor('avatar', storage))
  async editWithAvatar(
    @Param('id') id: string,
    @Body() editDto: EditClientDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    const client = await this.appService.getOne(id);
    client.name = editDto.name;
    client.lastName = editDto.lastName;
    client.tel = editDto.tel;
    client.email = editDto.email;
    client.date = editDto.date;
    client.avatar = avatar.filename;
    console.log(client);
    const editClient = await this.appService.edit(client);
    return { editClient };
  }

  @ApiProperty()
  @Get('profileimagies/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res) {
    return of(
      res.sendFile(
        join(process.cwd(), 'dist/uploads/profileimagies/' + imagename),
      ),
    );
  }
}
