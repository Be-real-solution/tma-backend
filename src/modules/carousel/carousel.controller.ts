import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { CarouselService } from './carousel.service'
import { ApiBearerAuth, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	CarouselCreateRequestDto,
	CarouselDeleteRequestDto,
	CarouselGetAllRequestDto,
	CarouselGetAllResponseDto,
	CarouselGetOneByIdRequestDto,
	CarouselGetOneResponseDto,
	CarouselUpdateRequestDto,
} from './dtos'
import { CarouselGetAllResponse, CarouselGetOneResponse } from './interfaces'
import { AuthGuard, LanguageDto, MutationResponseDto, PAGE_NUMBER, PAGE_SIZE, PAGINATION } from '../../common'
import { MutationResponse } from '../../interfaces'
import { FileInterceptor } from '@nestjs/platform-express'

@ApiTags('carousel')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('carousel')
export class CarouselController {
	private readonly service: CarouselService
	constructor(service: CarouselService) {
		this.service = service
	}

	@Get()
	@ApiResponse({ type: CarouselGetAllResponseDto })
	@ApiResponse({ type: CarouselGetOneResponseDto, isArray: true })
	getAll(@Query() payload: CarouselGetAllRequestDto, @Headers() header: LanguageDto): Promise<CarouselGetAllResponse | CarouselGetOneResponse[]> {
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
	@ApiResponse({ type: CarouselGetOneResponseDto })
	getOneById(@Param() payload: CarouselGetOneByIdRequestDto, @Headers() header: LanguageDto): Promise<CarouselGetOneResponse> {
		return this.service.getOneById(payload, header.lang)
	}

	@Post()
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('image'))
	@ApiResponse({ type: MutationResponseDto })
	create(@Body() payload: CarouselCreateRequestDto, @UploadedFile() image: Express.Multer.File): Promise<MutationResponse> {
		return this.service.create({ ...payload, imageLink: image.filename })
	}

	@Patch(':id')
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('image'))
	@ApiResponse({ type: MutationResponseDto })
	update(@Param() param: CarouselGetOneByIdRequestDto, @Body() payload: CarouselUpdateRequestDto, @UploadedFile() image: Express.Multer.File): Promise<MutationResponse> {
		return this.service.update(param, { ...payload, imageLink: image.filename ?? undefined })
	}

	@Delete(':id')
	@ApiResponse({ type: MutationResponseDto })
	delete(@Param() param: CarouselDeleteRequestDto): Promise<MutationResponse> {
		return this.service.delete(param)
	}
}
