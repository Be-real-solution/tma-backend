import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { PaginationRequestDto } from '../../../common'
import { AdminCreateRequest, AdminDeleteRequest, AdminGetAllRequest, AdminGetOneByIdRequest, AdminUpdateRequest } from '../interfaces'
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { newRandomUUID } from '../../../common/helpers'
import { $Enums, AdminTypeEnum } from '@prisma/client'

export class AdminGetAllRequestDto extends PaginationRequestDto implements AdminGetAllRequest {
	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	fullName?: string

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	username?: string

	@ApiPropertyOptional({ type: String })
	@IsEnum(AdminTypeEnum)
	@IsOptional()
	type?: $Enums.AdminTypeEnum
}

export class AdminGetOneByIdRequestDto implements AdminGetOneByIdRequest {
	@ApiProperty({ type: String, example: newRandomUUID })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class AdminCreateRequestDto implements AdminCreateRequest {
	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	fullName: string

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	password: string

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	username: string

	@ApiPropertyOptional({ type: String })
	@IsEnum(AdminTypeEnum)
	@IsOptional()
	type?: $Enums.AdminTypeEnum
}

export class AdminUpdateRequestDto implements AdminUpdateRequest {
	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	fullName?: string

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	password?: string

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	username?: string

	@ApiPropertyOptional({ type: String })
	@IsEnum(AdminTypeEnum)
	@IsOptional()
	type?: $Enums.AdminTypeEnum
}

export class AdminDeleteRequestDto implements AdminDeleteRequest {
	@ApiProperty({ type: String, example: newRandomUUID })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
