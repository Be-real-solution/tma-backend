import { CategoryGetAllResponseDto, CategoryGetOneResponseDto } from './dtos/response.dtos'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { CategoryService } from './category.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard, MutationResponseDto, PAGE_NUMBER, PAGE_SIZE, PAGINATION } from '../../common'
import { CategoryCreateRequestDto, CategoryDeleteRequestDto, CategoryGetAllRequestDto, CategoryGetOneByIdRequestDto, CategoryUpdateRequestDto } from './dtos'
import { CategoryGetAllResponse, CategoryGetOneResponse } from './interfaces'
import { MutationResponse } from '../../interfaces'

@ApiTags('category')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
	private readonly service: CategoryService
	constructor(service: CategoryService) {
		this.service = service
	}

	@Get()
	@ApiResponse({ type: CategoryGetAllResponseDto })
	@ApiResponse({ type: CategoryGetOneResponseDto, isArray: true })
	getAll(@Query() payload: CategoryGetAllRequestDto): Promise<CategoryGetAllResponse | CategoryGetOneResponse[]> {
		return this.service.getAll({
			...payload,
			pageNumber: payload.pageNumber ?? PAGE_NUMBER,
			pageSize: payload.pageSize ?? PAGE_SIZE,
			pagination: [true, 'true'].includes(payload.pagination) ? PAGINATION : false,
		})
	}

	@Get(':id')
	@ApiResponse({ type: CategoryGetOneResponseDto })
	getOneById(@Param() payload: CategoryGetOneByIdRequestDto): Promise<CategoryGetOneResponse> {
		return this.service.getOneById(payload)
	}

	@Post()
	@ApiResponse({ type: MutationResponseDto })
	create(@Body() payload: CategoryCreateRequestDto): Promise<MutationResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: MutationResponseDto })
	update(@Param() param: CategoryGetOneByIdRequestDto, @Body() payload: CategoryUpdateRequestDto): Promise<MutationResponse> {
		return this.service.update(param, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: MutationResponseDto })
	delete(@Param() param: CategoryDeleteRequestDto): Promise<MutationResponse> {
		return this.service.delete(param)
	}
}
