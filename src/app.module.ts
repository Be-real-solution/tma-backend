import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma'
import { databaseConfig } from './configs'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AuthModule, AuthorModule, BuildingModule, NewImageModule, NewModule } from './modules'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'uploads', 'images'),
			serveRoot: '/uploads/images',
		}),
		JwtModule.register({ global: true }),
		ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
		PrismaModule,
		AuthModule,
		AuthorModule,
		BuildingModule,
		NewModule,
		NewImageModule,
	],
})
export class AppModule {}
