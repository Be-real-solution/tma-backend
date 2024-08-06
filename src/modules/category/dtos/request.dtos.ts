import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { PaginationRequestDto } from '../../../common'
import { CategoryCreateRequest, CategoryDeleteRequest, CategoryGetAllRequest, CategoryGetOneByIdRequest, CategoryUpdateRequest } from '../interfaces'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { newRandomUUID } from '../../../common/helpers'

export class CategoryGetAllRequestDto extends PaginationRequestDto implements CategoryGetAllRequest {
	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	name?: string
}

export class CategoryGetOneByIdRequestDto implements CategoryGetOneByIdRequest {
	@ApiProperty({ type: String, example: newRandomUUID })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class CategoryCreateRequestDto implements CategoryCreateRequest {
	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	name: string
}

export class CategoryUpdateRequestDto implements CategoryUpdateRequest {
	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	name?: string
}

export class CategoryDeleteRequestDto implements CategoryDeleteRequest {
	@ApiProperty({ type: String, example: newRandomUUID })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
