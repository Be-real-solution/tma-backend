import { CategoryGetAllResDto, CategoryGetOneResDto } from './dtos/response.dtos'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { CategoryService } from './category.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard, MutationResDto, PAGE_NUMBER, PAGE_SIZE, PAGINATION } from '../../common'
import { CategoryCreateRequestDto, CategoryDeleteRequestDto, CategoryGetAllRequestDto, CategoryGetOneByIdRequestDto, CategoryUpdateRequestDto } from './dtos'
import { CategoryGetAllResponse, CategoryGetOneResponse } from './interfaces'
import { CResponse, MutationResponse } from '../../interfaces'

@ApiTags('category')
@Controller('category')
export class CategoryController {
	private readonly service: CategoryService
	constructor(service: CategoryService) {
		this.service = service
	}

	@Get()
	@ApiResponse({ type: CategoryGetAllResDto })
	@ApiResponse({ type: CategoryGetOneResDto, isArray: true })
	getAll(@Query() payload: CategoryGetAllRequestDto): Promise<CResponse<CategoryGetAllResponse | CategoryGetOneResponse[]>> {
		return this.service.getAll({
			...payload,
			pageNumber: payload.pageNumber ?? PAGE_NUMBER,
			pageSize: payload.pageSize ?? PAGE_SIZE,
			pagination: [true, 'true'].includes(payload.pagination) ? PAGINATION : false,
		})
	}

	@Get(':id')
	@ApiResponse({ type: CategoryGetOneResDto })
	getOneById(@Param() payload: CategoryGetOneByIdRequestDto): Promise<CResponse<CategoryGetOneResponse>> {
		return this.service.getOneById(payload)
	}

	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@Post()
	@ApiResponse({ type: MutationResDto })
	create(@Body() payload: CategoryCreateRequestDto): Promise<CResponse<MutationResponse>> {
		return this.service.create(payload)
	}

	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@Patch(':id')
	@ApiResponse({ type: MutationResDto })
	update(@Param() param: CategoryGetOneByIdRequestDto, @Body() payload: CategoryUpdateRequestDto): Promise<CResponse<MutationResponse>> {
		return this.service.update(param, payload)
	}

	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@Delete(':id')
	@ApiResponse({ type: MutationResDto })
	delete(@Param() param: CategoryDeleteRequestDto): Promise<CResponse<MutationResponse>> {
		return this.service.delete(param)
	}
}
