import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { PaginationRequestDto } from '../../../common'
import { AuthorCreateRequest, AuthorDeleteRequest, AuthorGetAllRequest, AuthorGetOneByIdRequest, AuthorUpdateRequest } from '../interfaces'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { newRandomUUID } from '../../../common/helpers'

export class AuthorGetAllRequestDto extends PaginationRequestDto implements AuthorGetAllRequest {
	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	fullName?: string
}

export class AuthorGetOneByIdRequestDto implements AuthorGetOneByIdRequest {
	@ApiProperty({ type: String, example: newRandomUUID })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class AuthorCreateRequestDto implements AuthorCreateRequest {
	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	fullName: string
}

export class AuthorUpdateRequestDto implements AuthorUpdateRequest {
	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	fullName?: string
}

export class AuthorDeleteRequestDto implements AuthorDeleteRequest {
	@ApiProperty({ type: String, example: newRandomUUID })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
