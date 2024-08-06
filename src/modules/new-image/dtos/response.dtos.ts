import { ApiProperty } from '@nestjs/swagger'
import { NewImageGetOneResponse } from '../interfaces'

export class NewImageGetOneResponseDto implements NewImageGetOneResponse {
	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: String })
	newId: string

	@ApiProperty({ type: String })
	imageLink: string

	@ApiProperty({ type: Date, example: new Date() })
	createdAt: Date
}
