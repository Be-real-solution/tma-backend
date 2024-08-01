import { AuthorGetAllResponseDto, AuthorGetOneResponseDto } from './dtos/response.dtos'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { AuthorService } from './author.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard, MutationResponseDto, PAGE_NUMBER, PAGE_SIZE, PAGINATION } from '../../common'
import { AuthorCreateRequestDto, AuthorDeleteRequestDto, AuthorGetAllRequestDto, AuthorGetOneByIdRequestDto, AuthorUpdateRequestDto } from './dtos'
import { AuthorGetAllResponse, AuthorGetOneResponse } from './interfaces'
import { MutationResponse } from '../../interfaces'

@ApiTags('author')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('author')
export class AuthorController {
	private readonly service: AuthorService
	constructor(service: AuthorService) {
		this.service = service
	}

	@Get()
	@ApiResponse({ type: AuthorGetAllResponseDto })
	@ApiResponse({ type: AuthorGetOneResponseDto, isArray: true })
	getAll(@Query() payload: AuthorGetAllRequestDto): Promise<AuthorGetAllResponse | AuthorGetOneResponse[]> {
		return this.service.getAll({
			...payload,
			pageNumber: payload.pageNumber ?? PAGE_NUMBER,
			pageSize: payload.pageSize ?? PAGE_SIZE,
			pagination: [true, 'true'].includes(payload.pagination) ? PAGINATION : false,
		})
	}

	@Get(':id')
	@ApiResponse({ type: AuthorGetOneResponseDto })
	getOneById(@Param() payload: AuthorGetOneByIdRequestDto): Promise<AuthorGetOneResponse> {
		return this.service.getOneById(payload)
	}

	@Post()
	@ApiResponse({ type: MutationResponseDto })
	create(@Body() payload: AuthorCreateRequestDto): Promise<MutationResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: MutationResponseDto })
	update(@Param() param: AuthorGetOneByIdRequestDto, @Body() payload: AuthorUpdateRequestDto): Promise<MutationResponse> {
		return this.service.update(param, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: MutationResponseDto })
	delete(@Param() param: AuthorDeleteRequestDto): Promise<MutationResponse> {
		return this.service.delete(param)
	}
}
