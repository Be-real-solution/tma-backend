import { ApiProperty } from '@nestjs/swagger'
import { CreateInManyLangsDto, CResponseDto, PaginationResponseDto } from '../../../common'
import { CategoryGetAllForAdminResponse, CategoryGetAllResponse, CategoryGetOneForAdminResponse, CategoryGetOneResponse } from '../interfaces'
import { newRandomUUID } from '../../../common/helpers'
import { CreateInManyLangs } from '../../../interfaces'

export class CategoryGetOneResponseDto implements CategoryGetOneResponse {
	@ApiProperty({ type: String, example: newRandomUUID })
	id: string

	@ApiProperty({ type: String })
	name: string

	@ApiProperty({ type: Date, example: new Date() })
	createdAt: Date
}

export class CategoryGetAllResponseDto extends PaginationResponseDto implements CategoryGetAllResponse {
	@ApiProperty({ type: CategoryGetOneResponseDto, isArray: true })
	data: CategoryGetOneResponse[]
}

export class CategoryGetOneForAdminResponseDto implements CategoryGetOneForAdminResponse {
	@ApiProperty({ type: String, example: newRandomUUID })
	id: string

	@ApiProperty({ type: CreateInManyLangsDto })
	name: CreateInManyLangs

	@ApiProperty({ type: Date, example: new Date() })
	createdAt: Date
}

export class CategoryGetAllForAdminResponseDto extends PaginationResponseDto implements CategoryGetAllForAdminResponse {
	@ApiProperty({ type: CategoryGetOneForAdminResponseDto, isArray: true })
	data: CategoryGetOneForAdminResponse[]
}

//=======================

export class CategoryGetOneResDto extends CResponseDto<CategoryGetOneResponse> {
	@ApiProperty({ type: CategoryGetOneResponseDto })
	data: CategoryGetOneResponse
}

export class CategoryGetAllResDto extends CResponseDto<CategoryGetAllResponse> {
	@ApiProperty({ type: CategoryGetAllResponseDto })
	data: CategoryGetAllResponseDto
}

export class CategoryGetOneForAdminResDto extends CResponseDto<CategoryGetOneForAdminResponse> {
	@ApiProperty({ type: CategoryGetOneForAdminResponseDto })
	data: CategoryGetOneForAdminResponse
}

export class CategoryGetAllForAdminResDto extends CResponseDto<CategoryGetAllForAdminResponse> {
	@ApiProperty({ type: CategoryGetAllForAdminResponseDto })
	data: CategoryGetAllForAdminResponseDto
}
