import { ApiProperty } from '@nestjs/swagger'
import { NewImageCreateRequest, NewImageDeleteRequest, NewImageGetAllRequest } from '../interfaces'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class NewImageGetAllRequestDto implements NewImageGetAllRequest {
	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	newId: string
}

export class NewImageCreateRequestDto implements NewImageCreateRequest {
	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	newId: string

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	imageLink: string
}

export class NewImageDeleteRequestDto implements NewImageDeleteRequest {
	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
