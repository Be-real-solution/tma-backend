import { ApiProperty } from '@nestjs/swagger'
import { CreateInManyLangsDto, PaginationResponseDto } from '../../../common'
import { BuildingGetAllForAdminResponse, BuildingGetAllResponse, BuildingGetOneForAdminResponse, BuildingGetOneResponse } from '../interfaces'
import { newRandomUUID } from '../../../common/helpers'
import { CreateInManyLangs } from '../../../interfaces'

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

export class BuildingGetOneForAdminResponseDto implements BuildingGetOneForAdminResponse {
	@ApiProperty({ type: String, example: newRandomUUID })
	id: string

	@ApiProperty({ type: CreateInManyLangsDto })
	name: CreateInManyLangs

	@ApiProperty({ type: CreateInManyLangsDto })
	address: CreateInManyLangs

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
export class BuildingGetAllForAdminResponseDto extends PaginationResponseDto implements BuildingGetAllForAdminResponse {
	@ApiProperty({ type: BuildingGetOneForAdminResponseDto, isArray: true })
	data: BuildingGetOneForAdminResponse[]
}
