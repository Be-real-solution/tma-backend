import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { BuildingService } from './building.service'
import { ApiBearerAuth, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	BuildingCreateRequestDto,
	BuildingDeleteRequestDto,
	BuildingGetAllRequestDto,
	BuildingGetAllResponseDto,
	BuildingGetOneByIdRequestDto,
	BuildingGetOneResponseDto,
	BuildingUpdateRequestDto,
} from './dtos'
import { BuildingGetAllResponse, BuildingGetOneResponse } from './interfaces'
import { AuthGuard, LanguageDto, MutationResponseDto, PAGE_NUMBER, PAGE_SIZE, PAGINATION } from '../../common'
import { MutationResponse } from '../../interfaces'
import { FileInterceptor } from '@nestjs/platform-express'

@ApiTags('building')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('building')
export class BuildingController {
	private readonly service: BuildingService
	constructor(service: BuildingService) {
		this.service = service
	}

	@Get()
	@ApiResponse({ type: BuildingGetAllResponseDto })
	@ApiResponse({ type: BuildingGetOneResponseDto, isArray: true })
	getAll(@Query() payload: BuildingGetAllRequestDto, @Headers() header: LanguageDto): Promise<BuildingGetAllResponse | BuildingGetOneResponse[]> {
		return this.service.getAll(
			{
				...payload,
				pageNumber: payload.pageNumber ?? PAGE_NUMBER,
				pageSize: payload.pageSize ?? PAGE_SIZE,
				pagination: [true, 'true'].includes(payload.pagination) ? PAGINATION : false,
			},
			header.lang,
		)
	}

	@Get(':id')
	@ApiResponse({ type: BuildingGetOneResponseDto })
	getOneById(@Param() payload: BuildingGetOneByIdRequestDto, @Headers() header: LanguageDto): Promise<BuildingGetOneResponse> {
		return this.service.getOneById(payload, header.lang)
	}

	@Post()
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('image'))
	@ApiResponse({ type: MutationResponseDto })
	create(@Body() payload: BuildingCreateRequestDto, @UploadedFile() image: Express.Multer.File): Promise<MutationResponse> {
		return this.service.create({ ...payload, imageLink: image.filename })
	}

	@Patch(':id')
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('image'))
	@ApiResponse({ type: MutationResponseDto })
	update(@Param() param: BuildingGetOneByIdRequestDto, @Body() payload: BuildingUpdateRequestDto, @UploadedFile() image: Express.Multer.File): Promise<MutationResponse> {
		return this.service.update(param, { ...payload, imageLink: image.filename ?? undefined })
	}

	@Delete(':id')
	@ApiResponse({ type: MutationResponseDto })
	delete(@Param() param: BuildingDeleteRequestDto): Promise<MutationResponse> {
		return this.service.delete(param)
	}
}
