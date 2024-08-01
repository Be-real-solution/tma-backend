import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponseDto } from '../../../common'
import { AuthorGetAllResponse, AuthorGetOneResponse } from '../interfaces'
import { newRandomUUID } from '../../../common/helpers'
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class AuthorGetOneResponseDto implements AuthorGetOneResponse {
	@ApiProperty({ type: String, example: newRandomUUID })
	@IsUUID('4')
	@IsNotEmpty()
	id: string

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	fullName: string

	@ApiProperty({ type: Date, example: new Date() })
	@IsDateString()
	@IsNotEmpty()
	createdAt: Date
}

export class AuthorGetAllResponseDto extends PaginationResponseDto implements AuthorGetAllResponse {
	@ApiProperty({ type: AuthorGetOneResponseDto, isArray: true })
	data: AuthorGetOneResponse[]
}
