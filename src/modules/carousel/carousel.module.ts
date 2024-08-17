import { Module } from '@nestjs/common'
import { CarouselController } from './carousel.controller'
import { CarouselService } from './carousel.service'
import { CarouselRepo } from './carousel.repo'
import { TranslationModule } from '../translation'

@Module({
	imports: [TranslationModule],
	controllers: [CarouselController],
	providers: [CarouselService, CarouselRepo],
	exports: [CarouselService, CarouselRepo],
})
export class CarouselModule {}
