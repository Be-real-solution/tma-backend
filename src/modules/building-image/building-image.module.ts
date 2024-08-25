import { Module } from '@nestjs/common'
import { BuildingImageController } from './building-image.controller'
import { BuildingImageService } from './building-image.service'
import { BuildingImageRepo } from './building-image.repo'

@Module({
	imports: [],
	controllers: [BuildingImageController],
	providers: [BuildingImageService, BuildingImageRepo],
	exports: [BuildingImageService, BuildingImageRepo],
})
export class BuildingImageModule {}
