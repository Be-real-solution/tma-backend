import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { BuildingImageService } from './building-image.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { BuildingImageCreateRequestDto, BuildingImageDeleteRequestDto, BuildingImageGetAllRequestDto, BuildingImageGetOneResponseDto } from './dtos'
import { BuildingImageGetOneResponse } from './interfaces'
import { AuthGuard, MutationResponseDto } from '../../common'
import { MutationResponse } from '../../interfaces'

@ApiTags('building-image')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('building-image')
export class BuildingImageController {
	private readonly service: BuildingImageService
	constructor(service: BuildingImageService) {
		this.service = service
	}

	@Get()
	@ApiResponse({ type: BuildingImageGetOneResponseDto, isArray: true })
	getAll(@Query() payload: BuildingImageGetAllRequestDto): Promise<BuildingImageGetOneResponse[]> {
		return this.service.getAll(payload)
	}

	@Post()
	@ApiResponse({ type: MutationResponseDto })
	create(@Body() payload: BuildingImageCreateRequestDto): Promise<MutationResponse> {
		return this.service.create(payload)
	}

	@Delete(':id')
	@ApiResponse({ type: MutationResponseDto })
	delete(@Param() param: BuildingImageDeleteRequestDto): Promise<MutationResponse> {
		return this.service.delete(param)
	}
}
