import { AdminGetAllResDto, AdminGetOneResDto } from './dtos/response.dtos'
import { Body, Controller, Delete, Get, Headers, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { AdminService } from './admin.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard, MutationResDto, PAGE_NUMBER, PAGE_SIZE, PAGINATION } from '../../common'
import { AdminCreateRequestDto, AdminDeleteRequestDto, AdminGetAllRequestDto, AdminGetOneByIdRequestDto, AdminUpdateRequestDto } from './dtos'
import { AdminGetAllResponse, AdminGetOneResponse } from './interfaces'
import { CResponse, MutationResponse } from '../../interfaces'

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
	private readonly service: AdminService
	constructor(service: AdminService) {
		this.service = service
	}

	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@Get()
	@ApiResponse({ type: AdminGetAllResDto })
	@ApiResponse({ type: AdminGetOneResDto, isArray: true })
	getAll(@Query() payload: AdminGetAllRequestDto): Promise<CResponse<AdminGetAllResponse | AdminGetOneResponse[]>> {
		return this.service.getAll({
			...payload,
			pageNumber: payload.pageNumber ?? PAGE_NUMBER,
			pageSize: payload.pageSize ?? PAGE_SIZE,
			pagination: [true, 'true'].includes(payload.pagination) ? PAGINATION : false,
		})
	}

	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	@ApiResponse({ type: AdminGetOneResDto })
	getOneById(@Param() payload: AdminGetOneByIdRequestDto): Promise<CResponse<AdminGetOneResponse>> {
		return this.service.getOneById(payload)
	}

	@Post()
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ type: MutationResDto })
	create(@Body() payload: AdminCreateRequestDto, @Headers() headers: { authorization?: string }): Promise<CResponse<MutationResponse>> {
		return this.service.create(payload, headers.authorization)
	}

	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@Patch(':id')
	@ApiResponse({ type: MutationResDto })
	update(@Param() param: AdminGetOneByIdRequestDto, @Body() payload: AdminUpdateRequestDto): Promise<CResponse<MutationResponse>> {
		return this.service.update(param, payload)
	}

	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	@ApiResponse({ type: MutationResDto })
	delete(@Param() param: AdminDeleteRequestDto): Promise<CResponse<MutationResponse>> {
		return this.service.delete(param)
	}
}
