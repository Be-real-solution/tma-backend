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
import { AuthGuard, MutationResDto, MutationResponseDto, PAGE_NUMBER, PAGE_SIZE, PAGINATION } from '../../common'
import { CResponse, CustomUploadedFiles, MutationResponse } from '../../interfaces'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { LanguageEnum } from '@prisma/client'

@ApiTags('new')
@Controller('new')
export class NewController {
	private readonly service: NewService
	constructor(service: NewService) {
		this.service = service
	}

	@Get()
	@ApiResponse({ type: NewGetAllResponseDto })
	@ApiResponse({ type: NewGetOneResponseDto, isArray: true })
	getAll(@Query() payload: NewGetAllRequestDto, @Headers('accept-language') lang: LanguageEnum): Promise<CResponse<NewGetAllResponse | NewGetOneResponse[]>> {
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
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@Get('for-admin')
	@ApiResponse({ type: NewGetAllForAdminResponseDto })
	@ApiResponse({ type: NewGetOneForAdminResponseDto, isArray: true })
	getAllForAdmin(@Query() payload: NewGetAllRequestDto): Promise<CResponse<NewGetAllForAdminResponse | NewGetOneForAdminResponse[]>> {
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
	getAllForCarousel(@Headers('accept-language') lang: LanguageEnum): Promise<CResponse<NewGetAllResponse | NewGetOneResponse[]>> {
		return this.service.getAll({ isTop: true, pagination: false }, lang)
	}

	@Get(':id')
	@ApiResponse({ type: NewGetOneResponseDto })
	getOneById(@Param() payload: NewGetOneByIdRequestDto, @Headers('accept-language') lang: LanguageEnum): Promise<CResponse<NewGetOneResponse>> {
		return this.service.getOneById(payload, lang)
	}

	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@Post()
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'image', maxCount: 1 },
			{ name: 'images', maxCount: 10 },
		]),
	)
	@ApiResponse({ type: MutationResponseDto })
	create(@Body() payload: NewCreateRequestDto, @UploadedFiles() files: CustomUploadedFiles): Promise<CResponse<MutationResponse>> {
		if (!files || !files.image.length) {
			throw new BadRequestException('main image must be provided')
		}

		return this.service.create({ ...payload, image: files?.image[0].filename, images: files.images })
	}

	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@Patch('many-carousel')
	@ApiResponse({ type: MutationResDto })
	updateManyCarousel(@Body() payload: NewUpdateManyCarouselDto): Promise<CResponse<MutationResponse>> {
		return this.service.updateManyCarousel(payload)
	}

	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@Patch(':id')
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'image', maxCount: 1 },
			{ name: 'images', maxCount: 10 },
		]),
	)
	@ApiResponse({ type: MutationResDto })
	update(@Param() param: NewGetOneByIdRequestDto, @Body() payload: NewUpdateRequestDto, @UploadedFiles() files: CustomUploadedFiles): Promise<CResponse<MutationResponse>> {
		return this.service.update(param, { ...payload, image: files?.image.length ? files.image[0].filename || undefined : undefined, images: files.images })
	}

	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@Delete(':id')
	@ApiResponse({ type: MutationResDto })
	delete(@Param() param: NewDeleteRequestDto): Promise<CResponse<MutationResponse>> {
		return this.service.delete(param)
	}
}
