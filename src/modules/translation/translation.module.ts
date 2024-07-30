import { Module } from '@nestjs/common'
import { TranslationController } from './translation.controller'
import { TranslationService } from './translation.service'
import { TranslationRepo } from './translation.repo'

@Module({
	imports: [],
	controllers: [TranslationController],
	providers: [TranslationService, TranslationRepo],
	exports: [TranslationService, TranslationRepo],
})
export class TranslationModule {}
