import { BadRequestException, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma'
import { databaseConfig } from './configs'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AuthModule, AuthorModule, BuildingModule, CategoryModule, NewImageModule, NewModule, TranslationModule } from './modules'
import { JwtModule } from '@nestjs/jwt'
import { MulterModule } from '@nestjs/platform-express'
import * as multer from 'multer'
import { extname } from 'path'

@Module({
	imports: [
		ServeStaticModule.forRoot(
			{ rootPath: join(__dirname, '..', 'uploads', 'images'), serveRoot: '/uploads/images' },
			{ rootPath: join(__dirname, '..', 'uploads', 'videos'), serveRoot: '/uploads/videos' },
		),
		MulterModule.register({
			storage: multer.diskStorage({
				destination: (req, file, cb) => {
					const fileType = file.mimetype.startsWith('video/') ? 'videos' : 'images'
					cb(null, `./../uploads/${fileType}`)
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
		JwtModule.register({ global: true }),
		ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
		PrismaModule,
		AuthModule,
		AuthorModule,
		BuildingModule,
		CategoryModule,
		NewModule,
		NewImageModule,
		TranslationModule,
	],
})
export class AppModule {}
