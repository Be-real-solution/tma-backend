import { Module } from '@nestjs/common'
import { NewController } from './new.controller'
import { NewService } from './new.service'
import { NewRepo } from './new.repo'
import { NewImageModule } from '../new-image'

@Module({
	imports: [NewImageModule],
	controllers: [NewController],
	providers: [NewService, NewRepo],
	exports: [NewService, NewRepo],
})
export class NewModule {}
