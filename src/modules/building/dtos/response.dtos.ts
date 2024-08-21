import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponseDto } from '../../../common'
import { BuildingGetAllResponse, BuildingGetOneResponse } from '../interfaces'
import { newRandomUUID } from '../../../common/helpers'

export class BuildingGetOneResponseDto implements BuildingGetOneResponse {
	@ApiProperty({ type: String, example: newRandomUUID })
	id: string

	@ApiProperty({ type: String })
	name: string

	@ApiProperty({ type: String })
	address: string

	@ApiProperty({ type: String })
	imageLink: string

	@ApiProperty({ type: String })
	phoneNumber: string

	@ApiProperty({ type: String })
	workEndTime: string

	@ApiProperty({ type: String })
	workStartTime: string

	@ApiProperty({ type: String })
	latitude: string

	@ApiProperty({ type: String })
	longitude: string

	@ApiProperty({ type: Date, example: new Date() })
	createdAt: Date
}
export class BuildingGetAllResponseDto extends PaginationResponseDto implements BuildingGetAllResponse {
	@ApiProperty({ type: BuildingGetOneResponseDto, isArray: true })
	data: BuildingGetOneResponse[]
}
