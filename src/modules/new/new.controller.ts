import { BadRequestException, Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common'
import { NewService } from './new.service'
import { ApiBearerAuth, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	NewCreateRequestDto,
	NewDeleteRequestDto,
	NewGetAllForAdminResponseDto,
	NewGetAllRequestDto,
	NewGetAllResponseDto,
	NewGetOneByIdRequestDto,
	NewGetOneForAdminResponseDto,
	NewGetOneResponseDto,
	NewUpdateManyCarouselDto,
	NewUpdateRequestDto,
} from './dtos'
import { NewGetAllForAdminResponse, NewGetAllResponse, NewGetOneForAdminResponse, NewGetOneResponse } from './interfaces'
import { AuthGuard, LanguageGuard, MutationResponseDto, PAGE_NUMBER, PAGE_SIZE, PAGINATION } from '../../common'
import { MutationResponse } from '../../interfaces'
import { FilesInterceptor } from '@nestjs/platform-express'
import { LanguageEnum } from '@prisma/client'

@ApiTags('new')
@UseGuards(AuthGuard)
@UseGuards(LanguageGuard)
@ApiBearerAuth()
@Controller('new')
export class NewController {
	private readonly service: NewService
	constructor(service: NewService) {
		this.service = service
	}

	@Get()
	@ApiResponse({ type: NewGetAllResponseDto })
	@ApiResponse({ type: NewGetOneResponseDto, isArray: true })
	getAll(@Query() payload: NewGetAllRequestDto, @Headers('accept-language') lang: LanguageEnum): Promise<NewGetAllResponse | NewGetOneResponse[]> {
		return this.service.getAll(
			{
				...payload,
				pageNumber: payload.pageNumber ?? PAGE_NUMBER,
				pageSize: payload.pageSize ?? PAGE_SIZE,
				pagination: [true, 'true'].includes(payload.pagination) ? PAGINATION : false,
			},
			lang,
		)
	}

	@ApiTags('admin-panel')
	@Get('for-admin')
	@ApiResponse({ type: NewGetAllForAdminResponseDto })
	@ApiResponse({ type: NewGetOneForAdminResponseDto, isArray: true })
	getAllForAdmin(@Query() payload: NewGetAllRequestDto): Promise<NewGetAllForAdminResponse | NewGetOneForAdminResponse[]> {
		return this.service.getAllForAdmin({
			...payload,
			pageNumber: payload.pageNumber ?? PAGE_NUMBER,
			pageSize: payload.pageSize ?? PAGE_SIZE,
			pagination: [true, 'true'].includes(payload.pagination) ? PAGINATION : false,
		})
	}

	@Get('carousel')
	@ApiResponse({ type: NewGetAllResponseDto })
	@ApiResponse({ type: NewGetOneResponseDto, isArray: true })
	getAllForCarousel(@Headers('accept-language') lang: LanguageEnum): Promise<NewGetAllResponse | NewGetOneResponse[]> {
		return this.service.getAll({ isTop: true, pagination: false }, lang)
	}

	@Get(':id')
	@ApiResponse({ type: NewGetOneResponseDto })
	getOneById(@Param() payload: NewGetOneByIdRequestDto, @Headers('accept-language') lang: LanguageEnum): Promise<NewGetOneResponse> {
		return this.service.getOneById(payload, lang)
	}

	@Post()
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FilesInterceptor('images'))
	@ApiResponse({ type: MutationResponseDto })
	create(@Body() payload: NewCreateRequestDto, @UploadedFiles() images: Array<Express.Multer.File>): Promise<MutationResponse> {
		if (!images.length) {
			throw new BadRequestException('must have at least 1 image')
		}

		return this.service.create({ ...payload, images: images })
	}

	@Patch(':id')
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FilesInterceptor('images'))
	@ApiResponse({ type: MutationResponseDto })
	update(@Param() param: NewGetOneByIdRequestDto, @Body() payload: NewUpdateRequestDto, @UploadedFiles() images: Array<Express.Multer.File>): Promise<MutationResponse> {
		return this.service.update(param, { ...payload, images: images })
	}

	@Patch(':id')
	@ApiResponse({ type: MutationResponseDto })
	updateManyCarousel(@Body() payload: NewUpdateManyCarouselDto): Promise<MutationResponse> {
		return this.service.updateManyCarousel(payload)
	}

	@Delete(':id')
	@ApiResponse({ type: MutationResponseDto })
	delete(@Param() param: NewDeleteRequestDto): Promise<MutationResponse> {
		return this.service.delete(param)
	}
}
