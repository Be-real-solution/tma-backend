import { ApiProperty } from '@nestjs/swagger'
import { BuildingImageGetOneResponse } from '../interfaces'

export class BuildingImageGetOneResponseDto implements BuildingImageGetOneResponse {
	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: String })
	buildingId: string

	@ApiProperty({ type: String })
	imageLink: string

	@ApiProperty({ type: Date, example: new Date() })
	createdAt: Date
}
