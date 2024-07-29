import { Module } from '@nestjs/common'
import { NewController } from './new.controller'
import { NewService } from './new.service'
import { NewRepo } from './new.repo'

@Module({
	imports: [],
	controllers: [NewController],
	providers: [NewService, NewRepo],
	exports: [NewService, NewRepo],
})
export class NewModule {}
