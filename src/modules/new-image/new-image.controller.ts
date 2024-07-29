import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { NewImageService } from './new-image.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { NewImageCreateRequestDto, NewImageDeleteRequestDto, NewImageGetAllRequestDto, NewImageGetOneResponseDto } from './dtos'
import { NewImageGetOneResponse } from './interfaces'
import { AuthGuard, MutationResponseDto } from '../../common'
import { MutationResponse } from '../../interfaces'

@ApiTags('new-image')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('new-image')
export class NewImageController {
	private readonly service: NewImageService
	constructor(service: NewImageService) {
		this.service = service
	}

	@Get()
	@ApiResponse({ type: NewImageGetOneResponseDto, isArray: true })
	getAll(@Query() payload: NewImageGetAllRequestDto): Promise<NewImageGetOneResponse[]> {
		return this.service.getAll(payload)
	}

	@Post()
	@ApiResponse({ type: MutationResponseDto })
	create(@Body() payload: NewImageCreateRequestDto): Promise<MutationResponse> {
		return this.service.create(payload)
	}

	@Delete(':id')
	@ApiResponse({ type: MutationResponseDto })
	delete(@Param() param: NewImageDeleteRequestDto): Promise<MutationResponse> {
		return this.service.delete(param)
	}
}
