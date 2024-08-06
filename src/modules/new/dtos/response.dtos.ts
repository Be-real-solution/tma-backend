import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponseDto } from '../../../common'
import { NewGetAllResponse, NewGetOneResponse } from '../interfaces'

export class NewGetOneResponseDto implements NewGetOneResponse {
	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: String })
	name: string

	@ApiProperty({ type: String })
	authorId: string

	@ApiProperty({ type: Number })
	viewsCount: number

	@ApiProperty({ type: String })
	description: string

	@ApiProperty({ type: Date, example: new Date() })
	createdAt: Date
}

export class NewGetAllResponseDto extends PaginationResponseDto implements NewGetAllResponse {
	@ApiProperty({ type: NewGetOneResponseDto, isArray: true })
	data: NewGetOneResponse[]
}
