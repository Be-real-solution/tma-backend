import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma'
import { BuildingController } from './building.controller'
import { BuildingService } from './building.service'
import { BuildingRepo } from './building.repo'

@Module({
	imports: [PrismaModule],
	controllers: [BuildingController],
	providers: [BuildingService, BuildingRepo],
	exports: [BuildingService, BuildingRepo],
})
export class BuildingModule {}
