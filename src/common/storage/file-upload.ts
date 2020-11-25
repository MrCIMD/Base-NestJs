import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

// Allow only images
export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(
            new HttpException(
                'Only image files are allowed!',
                HttpStatus.BAD_REQUEST,
            ),
            false,
        );
    }
    callback(null, true);
};

export const fileRename = async (req, file, callback) => {
    const fileExtName = extname(file.originalname);
    const uniqueName = +new Date();
    callback(null, `${uniqueName}${fileExtName}`);
}