import { ApiProperty } from '@nestjs/swagger'
import { CResponseDto, PaginationResponseDto } from '../../../common'
import { CategoryGetAllResponse, CategoryGetOneResponse } from '../interfaces'
import { newRandomUUID } from '../../../common/helpers'
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CategoryGetOneResponseDto implements CategoryGetOneResponse {
	@ApiProperty({ type: String, example: newRandomUUID })
	@IsUUID('4')
	@IsNotEmpty()
	id: string

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({ type: Date, example: new Date() })
	@IsDateString()
	@IsNotEmpty()
	createdAt: Date
}

export class CategoryGetAllResponseDto extends PaginationResponseDto implements CategoryGetAllResponse {
	@ApiProperty({ type: CategoryGetOneResponseDto, isArray: true })
	data: CategoryGetOneResponse[]
}

export class CategoryGetOneResDto extends CResponseDto<CategoryGetOneResponse> {
	@ApiProperty({ type: CategoryGetOneResponseDto })
	data: CategoryGetOneResponse
}

export class CategoryGetAllResDto extends CResponseDto<CategoryGetAllResponse> {
	@ApiProperty({ type: CategoryGetAllResponseDto })
	data: CategoryGetAllResponseDto
}
