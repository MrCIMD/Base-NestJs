import {
  BadRequestException,
  Bind,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/';
import { existsSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { AppModule } from 'src/modules/app.module';

import { fileRename, imageFileFilter } from './file-upload';
import { IFileResponse } from './file.interface';

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: fileRename,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Bind(UploadedFile())
  uploadFile(file: IFileResponse) {
    file.url = `${AppModule.HTTP}://${AppModule.HOST}:${AppModule.PORT}/api/file/${file.filename}`;
    return file;
  }

  @Get(':filename')
  getImage(@Param('filename') image: string, @Res() res) {
    const path = `${__dirname}/../../../uploads/${image}`;
    if (!existsSync(path)) {
      image = 'no-image.png';
    }
    const response = res.sendFile(image, { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  @Delete(':filename')
  deleteImage(@Param('filename') image: string) {
    const path = `${__dirname}/../../../uploads/${image}`;
    if (existsSync(path)) {
      try {
        unlinkSync(path);
      } catch (e) {
        console.log(e);
        throw new BadRequestException(
          'Something went wrong deleting the file.',
        );
      }
    }
    return {
      status: HttpStatus.OK,
      message: 'File deleted',
    };
  }
}
