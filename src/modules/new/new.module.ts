import { Module } from '@nestjs/common'
import { NewController } from './new.controller'
import { NewService } from './new.service'
import { NewRepo } from './new.repo'
import { NewImageModule } from '../new-image'
import { TranslationModule } from '../translation'

@Module({
	imports: [NewImageModule, TranslationModule],
	controllers: [NewController],
	providers: [NewService, NewRepo],
	exports: [NewService, NewRepo],
})
export class NewModule {}
