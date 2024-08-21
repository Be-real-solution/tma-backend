import { BadRequestException, Module } from '@nestjs/common'
import { NewController } from './new.controller'
import { NewService } from './new.service'
import { NewRepo } from './new.repo'
import { NewImageModule } from '../new-image'
import { TranslationModule } from '../translation'
import { MulterModule } from '@nestjs/platform-express'
import * as multer from 'multer'
import { extname } from 'path'
@Module({
	imports: [
		TranslationModule,
		NewImageModule,
		MulterModule.register({
			storage: multer.diskStorage({
				destination: (req, file, cb) => {
					const fileType = file.mimetype.startsWith('video/') ? 'videos' : 'images'
					cb(null, `${process.cwd()}/uploads/${fileType}`)
				},
				filename: (req, file, cb) => {
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
					cb(null, `${uniqueSuffix}${extname(file.originalname)}`)
				},
			}),
			fileFilter: (req, file, cb) => {
				const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
				const allowedVideoTypes = ['video/mp4', 'video/avi']

				if (allowedImageTypes.includes(file.mimetype) || allowedVideoTypes.includes(file.mimetype)) {
					cb(null, true)
				} else {
					cb(new BadRequestException('Unsupported file type'), false)
				}
			},
		}),
	],

	controllers: [NewController],
	providers: [NewService, NewRepo],
	exports: [NewService, NewRepo],
})
export class NewModule {}
