import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CreateInManyLangsDto, PaginationRequestDto, UpdateInManyLangsDto } from '../../../common'
import { CreateInManyLangs, UpdateInManyLangs } from '../../../interfaces'
import { BuildingCreateRequest, BuildingDeleteRequest, BuildingGetAllRequest, BuildingGetOneByIdRequest, BuildingUpdateRequest } from '../interfaces'
import { IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID, ValidateNested } from 'class-validator'
import { IsTimeString, newRandomUUID } from '../../../common/helpers'
import { Type } from 'class-transformer'

export class BuildingGetAllRequestDto extends PaginationRequestDto implements BuildingGetAllRequest {
	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	name?: string

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	address?: string

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	phoneNumber?: string

	@ApiPropertyOptional({ type: String })
	@IsTimeString()
	@IsOptional()
	workEndTime?: string

	@ApiPropertyOptional({ type: String })
	@IsTimeString()
	@IsOptional()
	workStartTime?: string
}

export class BuildingGetOneByIdRequestDto implements BuildingGetOneByIdRequest {
	@ApiProperty({ type: String, example: newRandomUUID })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class BuildingCreateRequestDto implements BuildingCreateRequest {
	@ApiProperty({ type: CreateInManyLangsDto })
	@ValidateNested()
	@Type(() => CreateInManyLangsDto)
	@IsNotEmpty()
	name: CreateInManyLangs

	@ApiProperty({ type: CreateInManyLangsDto })
	@ValidateNested()
	@Type(() => CreateInManyLangsDto)
	@IsNotEmpty()
	address: CreateInManyLangs

	@ApiProperty({ type: 'string', format: 'binary' })
	image?: any

	@ApiProperty({ type: String })
	@IsPhoneNumber('UZ')
	@IsNotEmpty()
	phoneNumber: string

	@ApiProperty({ type: String })
	@IsTimeString()
	@IsNotEmpty()
	workEndTime: string

	@ApiProperty({ type: String })
	@IsTimeString()
	@IsNotEmpty()
	workStartTime: string

	@ApiProperty({ type: String })
	@IsLatitude()
	@IsNotEmpty()
	latitude: string

	@ApiProperty({ type: String })
	@IsLongitude()
	@IsNotEmpty()
	longitude: string
}

export class BuildingUpdateRequestDto implements BuildingUpdateRequest {
	@ApiPropertyOptional({ type: UpdateInManyLangsDto })
	@ValidateNested()
	@IsOptional()
	@Type(() => UpdateInManyLangsDto)
	name?: UpdateInManyLangs

	@ApiPropertyOptional({ type: UpdateInManyLangsDto })
	@ValidateNested()
	@IsOptional()
	@Type(() => UpdateInManyLangsDto)
	address?: UpdateInManyLangs

	@ApiPropertyOptional({ type: 'string', format: 'binary' })
	image?: any

	@ApiPropertyOptional({ type: String })
	@IsPhoneNumber('UZ')
	@IsOptional()
	phoneNumber?: string

	@ApiPropertyOptional({ type: String })
	@IsTimeString()
	@IsOptional()
	workEndTime?: string

	@ApiPropertyOptional({ type: String })
	@IsTimeString()
	@IsOptional()
	workStartTime?: string

	@ApiPropertyOptional({ type: String })
	@IsLatitude()
	@IsOptional()
	latitude?: string

	@ApiPropertyOptional({ type: String })
	@IsLongitude()
	@IsOptional()
	longitude?: string
}

export class BuildingDeleteRequestDto implements BuildingDeleteRequest {
	@ApiProperty({ type: String, example: newRandomUUID })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
