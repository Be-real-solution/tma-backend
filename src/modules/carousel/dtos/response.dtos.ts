import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponseDto } from '../../../common'
import { CarouselGetAllResponse, CarouselGetOneResponse } from '../interfaces'

export class CarouselGetOneResponseDto implements CarouselGetOneResponse {
	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: String })
	name: string

	@ApiProperty({ type: String })
	description: string

	@ApiProperty({ type: String })
	imageLink: string

	@ApiProperty({ type: Boolean })
	isActive: boolean

	@ApiProperty({ type: Date, example: new Date() })
	createdAt: Date
}

export class CarouselGetAllResponseDto extends PaginationResponseDto implements CarouselGetAllResponse {
	@ApiProperty({ type: CarouselGetOneResponseDto, isArray: true })
	data: CarouselGetOneResponse[]
}
