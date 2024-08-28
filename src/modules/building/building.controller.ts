import { BadRequestException, Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common'
import { BuildingService } from './building.service'
import { ApiBearerAuth, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	BuildingCreateRequestDto,
	BuildingDeleteRequestDto,
	BuildingGetAllForAdminResDto,
	BuildingGetAllRequestDto,
	BuildingGetAllResDto,
	BuildingGetOneByIdRequestDto,
	BuildingGetOneForAdminResDto,
	BuildingGetOneResDto,
	BuildingUpdateRequestDto,
} from './dtos'
import { BuildingGetAllForAdminResponse, BuildingGetAllResponse, BuildingGetOneForAdminResponse, BuildingGetOneResponse } from './interfaces'
import { AuthGuard, LanguageDto, MutationResDto, PAGE_NUMBER, PAGE_SIZE, PAGINATION } from '../../common'
import { CResponse, CustomUploadedFiles, MutationResponse } from '../../interfaces'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

@ApiTags('building')
@Controller('building')
export class BuildingController {
	private readonly service: BuildingService
	constructor(service: BuildingService) {
		this.service = service
	}

	@Get()
	@ApiResponse({ type: BuildingGetAllResDto })
	@ApiResponse({ type: BuildingGetOneResDto, isArray: true })
	getAll(@Query() payload: BuildingGetAllRequestDto, @Headers() header: LanguageDto): Promise<CResponse<BuildingGetAllResponse | BuildingGetOneResponse[]>> {
		return this.service.getAll(
			{
				...payload,
				pageNumber: payload.pageNumber ?? PAGE_NUMBER,
				pageSize: payload.pageSize ?? PAGE_SIZE,
				pagination: [true, 'true'].includes(payload.pagination) ? PAGINATION : false,
			},
			header['accept-language'],
		)
	}

	@ApiTags('admin-panel')
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@Get('for-admin')
	@ApiResponse({ type: BuildingGetAllForAdminResDto })
	@ApiResponse({ type: BuildingGetOneForAdminResDto, isArray: true })
	getAllForAdmin(@Query() payload: BuildingGetAllRequestDto): Promise<CResponse<BuildingGetAllForAdminResponse | BuildingGetOneForAdminResponse[]>> {
		return this.service.getAllForAdmin({
			...payload,
			pageNumber: payload.pageNumber ?? PAGE_NUMBER,
			pageSize: payload.pageSize ?? PAGE_SIZE,
			pagination: [true, 'true'].includes(payload.pagination) ? PAGINATION : false,
		})
	}

	@ApiTags('admin-panel')
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@Get('for-admin/:id')
	@ApiResponse({ type: BuildingGetOneResDto })
	getOneByIdForAdmin(@Param() payload: BuildingGetOneByIdRequestDto): Promise<CResponse<BuildingGetOneForAdminResponse>> {
		return this.service.getOneByIdForAdmin(payload)
	}

	@Get(':id')
	@ApiResponse({ type: BuildingGetOneResDto })
	getOneById(@Param() payload: BuildingGetOneByIdRequestDto, @Headers() header: LanguageDto): Promise<CResponse<BuildingGetOneResponse>> {
		return this.service.getOneById(payload, header['accept-language'])
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
	@ApiResponse({ type: MutationResDto })
	create(@Body() payload: BuildingCreateRequestDto, @UploadedFiles() files: CustomUploadedFiles): Promise<CResponse<MutationResponse>> {
		if (!files.image?.length) {
			throw new BadRequestException('image cannot be empty')
		}
		return this.service.create({ ...payload, image: files?.image[0].filename, images: files?.images })
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
	update(
		@Param() param: BuildingGetOneByIdRequestDto,
		@Body() payload: BuildingUpdateRequestDto,
		@UploadedFiles() files: CustomUploadedFiles,
	): Promise<CResponse<MutationResponse>> {
		return this.service.update(param, { ...payload, image: files?.image?.length ? files?.image[0].filename ?? undefined : undefined, images: files?.images })
	}

	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@Delete(':id')
	@ApiResponse({ type: MutationResDto })
	delete(@Param() param: BuildingDeleteRequestDto): Promise<CResponse<MutationResponse>> {
		return this.service.delete(param)
	}
}
