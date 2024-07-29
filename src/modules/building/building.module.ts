import { Module } from '@nestjs/common'
import { BuildingController } from './building.controller'
import { BuildingService } from './building.service'
import { BuildingRepo } from './building.repo'

@Module({
	imports: [],
	controllers: [BuildingController],
	providers: [BuildingService, BuildingRepo],
	exports: [BuildingService, BuildingRepo],
})
export class BuildingModule {}
