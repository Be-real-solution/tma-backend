import { Module } from '@nestjs/common'
import { AuthorController } from './author.controller'
import { AuthorService } from './author.service'
import { AuthorRepo } from './author.repo'

@Module({
	imports: [],
	controllers: [AuthorController],
	providers: [AuthorService, AuthorRepo],
	exports: [AuthorService, AuthorRepo],
})
export class AuthorModule {}
