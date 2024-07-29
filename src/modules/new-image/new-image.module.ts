import { Module } from '@nestjs/common'
import { NewImageController } from './new-image.controller'
import { NewImageService } from './new-image.service'
import { NewImageRepo } from './new-image.repo'

@Module({
	imports: [],
	controllers: [NewImageController],
	providers: [NewImageService, NewImageRepo],
	exports: [NewImageService, NewImageRepo],
})
export class NewImageModule {}
