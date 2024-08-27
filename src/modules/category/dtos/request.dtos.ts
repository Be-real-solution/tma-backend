import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CreateInManyLangsDto, PaginationRequestDto, UpdateInManyLangsDto } from '../../../common'
import { CategoryCreateRequest, CategoryDeleteRequest, CategoryGetAllRequest, CategoryGetOneByIdRequest, CategoryUpdateRequest } from '../interfaces'
import { IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'
import { newRandomUUID } from '../../../common/helpers'
import { CreateInManyLangs, UpdateInManyLangs } from '../../../interfaces'
import { Type } from 'class-transformer'

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
	@ApiProperty({ type: CreateInManyLangsDto })
	@ValidateNested()
	@Type(() => CreateInManyLangsDto)
	@IsNotEmpty()
	name: CreateInManyLangs
}

export class CategoryUpdateRequestDto implements CategoryUpdateRequest {
	@ApiPropertyOptional({ type: UpdateInManyLangsDto })
	@ValidateNested()
	@IsOptional()
	@Type(() => UpdateInManyLangsDto)
	name?: UpdateInManyLangs
}

export class CategoryDeleteRequestDto implements CategoryDeleteRequest {
	@ApiProperty({ type: String, example: newRandomUUID })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
