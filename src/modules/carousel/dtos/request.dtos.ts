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
	@IsNotEmpty()
	@Type(() => CreateInManyLangsDto)
	name: CreateInManyLangs

	@ApiProperty({ type: CreateInManyLangsDto })
	@ValidateNested()
	@IsNotEmpty()
	@Type(() => CreateInManyLangsDto)
	description: CreateInManyLangs

	@ApiProperty({ type: String, format: 'binary' })
	@IsNotEmpty()
	imageLink: string
}

export class CarouselUpdateRequestDto implements CarouselUpdateRequest {
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

	@ApiPropertyOptional({ type: String, format: 'binary' })
	@IsOptional()
	imageLink?: string
}

export class CarouselDeleteRequestDto implements CarouselDeleteRequest {
	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
