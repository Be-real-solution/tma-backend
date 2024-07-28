import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma'
import { AuthorController } from './author.controller'
import { AuthorService } from './author.service'
import { AuthorRepo } from './author.repo'

@Module({
	imports: [PrismaModule],
	controllers: [AuthorController],
	providers: [AuthorService, AuthorRepo],
	exports: [AuthorService, AuthorRepo],
})
export class AuthorModule {}
