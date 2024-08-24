import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma'
import { databaseConfig } from './configs'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AdminModule, AuthModule, AuthorModule, BuildingModule, CategoryModule, NewImageModule, NewModule, TranslationModule } from './modules'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [
		ServeStaticModule.forRoot(
			{ rootPath: join(__dirname, '..', 'uploads', 'images'), serveRoot: '/uploads/images' },
			{ rootPath: join(__dirname, '..', 'uploads', 'videos'), serveRoot: '/uploads/videos' },
		),
		JwtModule.register({ global: true }),
		ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
		PrismaModule,
		AuthModule,
		AdminModule,
		AuthorModule,
		BuildingModule,
		CategoryModule,
		NewModule,
		NewImageModule,
		TranslationModule,
	],
})
export class AppModule {}
