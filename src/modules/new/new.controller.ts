import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { NewService } from './new.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { NewCreateRequestDto, NewDeleteRequestDto, NewGetAllRequestDto, NewGetAllResponseDto, NewGetOneByIdRequestDto, NewGetOneResponseDto, NewUpdateRequestDto } from './dtos'
import { NewGetAllResponse, NewGetOneResponse } from './interfaces'
import { AuthGuard, MutationResponseDto, PAGE_NUMBER, PAGE_SIZE, PAGINATION } from '../../common'
import { MutationResponse } from '../../interfaces'

@ApiTags('new')
@UseGuards(AuthGuard)
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
	getAll(@Query() payload: NewGetAllRequestDto): Promise<NewGetAllResponse | NewGetOneResponse[]> {
		return this.service.getAll({
			...payload,
			pageNumber: payload.pageNumber ?? PAGE_NUMBER,
			pageSize: payload.pageSize ?? PAGE_SIZE,
			pagination: payload.pagination === true ? PAGINATION : false,
		})
	}

	@Get(':id')
	@ApiResponse({ type: NewGetOneResponseDto })
	getOneById(@Param() payload: NewGetOneByIdRequestDto): Promise<NewGetOneResponse> {
		return this.service.getOneById(payload)
	}

	@Post()
	@ApiResponse({ type: MutationResponseDto })
	create(@Body() payload: NewCreateRequestDto): Promise<MutationResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: MutationResponseDto })
	update(@Param() param: NewGetOneByIdRequestDto, @Body() payload: NewUpdateRequestDto): Promise<MutationResponse> {
		return this.service.update(param, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: MutationResponseDto })
	delete(@Param() param: NewDeleteRequestDto): Promise<MutationResponse> {
		return this.service.delete(param)
	}
}
