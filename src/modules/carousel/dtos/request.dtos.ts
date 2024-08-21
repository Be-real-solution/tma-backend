import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CreateInManyLangsDto, PaginationRequestDto, UpdateInManyLangsDto } from '../../../common'
import { CreateInManyLangs, UpdateInManyLangs } from '../../../interfaces'
import { CarouselCreateRequest, CarouselDeleteRequest, CarouselGetAllRequest, CarouselGetOneByIdRequest, CarouselGetOneRequest, CarouselUpdateRequest } from '../interfaces'
import { IsBooleanString, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class CarouselGetAllRequestDto extends PaginationRequestDto implements CarouselGetAllRequest {
	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	name?: string

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	description?: string

	@ApiPropertyOptional({ type: Boolean })
	@IsBooleanString()
	@IsOptional()
	isActive?: boolean
}

export class CarouselGetOneByIdRequestDto implements CarouselGetOneByIdRequest {
	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class CarouselGetOneRequestDto implements CarouselGetOneRequest {
	@ApiPropertyOptional({ type: String })
	@IsUUID('4')
	@IsOptional()
	id?: string

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	name?: string

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	description?: string

	@ApiPropertyOptional({ type: Boolean })
	@IsBooleanString()
	@IsOptional()
	isActive?: boolean
}

export class CarouselCreateRequestDto implements CarouselCreateRequest {
	@ApiProperty({ type: CreateInManyLangsDto })
	@ValidateNested()
	@Type(() => CreateInManyLangsDto)
	@IsNotEmpty()
	name: CreateInManyLangs

	@ApiProperty({ type: CreateInManyLangsDto })
	@ValidateNested()
	@Type(() => CreateInManyLangsDto)
	@IsNotEmpty()
	description: CreateInManyLangs

	@ApiProperty({ type: 'string', format: 'binary' })
	image?: any
}

export class CarouselUpdateRequestDto implements CarouselUpdateRequest {
	@ApiPropertyOptional({ type: UpdateInManyLangsDto })
	@ValidateNested()
	@Type(() => UpdateInManyLangsDto)
	@IsOptional()
	name?: UpdateInManyLangs

	@ApiPropertyOptional({ type: UpdateInManyLangsDto })
	@ValidateNested()
	@Type(() => UpdateInManyLangsDto)
	@IsOptional()
	description?: UpdateInManyLangs

	@ApiPropertyOptional({ type: 'string', format: 'binary' })
	image?: any
}

export class CarouselDeleteRequestDto implements CarouselDeleteRequest {
	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
