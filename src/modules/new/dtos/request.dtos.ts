import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CreateInManyLangsDto, PaginationRequestDto, UpdateInManyLangsDto } from '../../../common'
import { CreateInManyLangs, UpdateInManyLangs } from '../../../interfaces'
import { NewCreateRequest, NewDeleteRequest, NewGetAllRequest, NewGetOneByIdRequest, NewGetOneRequest, NewUpdateRequest } from '../interfaces'
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class NewGetAllRequestDto extends PaginationRequestDto implements NewGetAllRequest {
	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	name?: string

	@ApiPropertyOptional({ type: String })
	@IsUUID('4')
	@IsOptional()
	authorId?: string

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	description?: string

	@ApiPropertyOptional({ type: String })
	@IsUUID('4')
	@IsOptional()
	categoryId?: string
}

export class NewGetOneByIdRequestDto implements NewGetOneByIdRequest {
	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class NewGetOneRequestDto implements NewGetOneRequest {
	@ApiPropertyOptional({ type: String })
	@IsUUID('4')
	@IsOptional()
	id?: string

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	name?: string

	@ApiPropertyOptional({ type: String })
	@IsUUID('4')
	@IsOptional()
	authorId?: string

	@ApiPropertyOptional({ type: Number })
	@IsNumber()
	@IsOptional()
	viewsCount?: number

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	description?: string

	@ApiPropertyOptional({ type: String })
	@IsUUID('4')
	@IsOptional()
	categoryId?: string
}

export class NewCreateRequestDto implements NewCreateRequest {
	@ApiProperty({ type: CreateInManyLangsDto })
	@ValidateNested()
	@IsNotEmpty()
	@Type(() => CreateInManyLangsDto)
	name: CreateInManyLangs

	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	authorId: string

	@ApiProperty({ type: CreateInManyLangsDto })
	@ValidateNested()
	@IsNotEmpty()
	@Type(() => CreateInManyLangsDto)
	description: CreateInManyLangs

	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	categoryId: string

	@ApiProperty({ type: 'string', format: 'binary', isArray: true })
	images?: any[]
}

export class NewUpdateRequestDto implements NewUpdateRequest {
	@ApiPropertyOptional({ type: UpdateInManyLangsDto })
	@ValidateNested()
	@IsOptional()
	@Type(() => UpdateInManyLangsDto)
	name?: UpdateInManyLangs

	@ApiPropertyOptional({ type: UpdateInManyLangsDto })
	@ValidateNested()
	@IsOptional()
	@Type(() => UpdateInManyLangsDto)
	description?: UpdateInManyLangs

	@ApiPropertyOptional({ type: String })
	@IsUUID('4')
	@IsOptional()
	authorId?: string

	@ApiPropertyOptional({ type: Number })
	@IsNumber()
	@IsOptional()
	viewsCount?: number

	@ApiPropertyOptional({ type: String })
	@IsUUID('4')
	@IsOptional()
	categoryId?: string

	@ApiPropertyOptional({ type: String, isArray: true })
	@ValidateNested({ each: true })
	@IsUUID('4')
	@IsOptional()
	imagesToDelete?: string[]

	@ApiProperty({ type: 'string', format: 'binary', isArray: true })
	images?: any[]
}

export class NewDeleteRequestDto implements NewDeleteRequest {
	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
