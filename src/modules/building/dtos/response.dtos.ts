import { ApiProperty } from '@nestjs/swagger'
import { CreateInManyLangsDto, CResponseDto, PaginationResponseDto } from '../../../common'
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
	description: string

	@ApiProperty({ type: String })
	mainImage: string

	@ApiProperty({ type: String, isArray: true })
	images: string[]

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
	description: CreateInManyLangs

	@ApiProperty({ type: CreateInManyLangsDto })
	address: CreateInManyLangs

	@ApiProperty({ type: String })
	mainImage: string

	@ApiProperty({ type: String, isArray: true })
	images: string[]

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

//======================

export class BuildingGetOneResDto extends CResponseDto<BuildingGetOneResponse> {
	@ApiProperty({ type: BuildingGetOneResponseDto })
	data: BuildingGetOneResponse
}

export class BuildingGetAllResDto extends CResponseDto<BuildingGetAllResponse> {
	@ApiProperty({ type: BuildingGetAllResponseDto })
	data: BuildingGetAllResponse
}

export class BuildingGetOneForAdminResDto extends CResponseDto<BuildingGetOneForAdminResponse> {
	@ApiProperty({ type: BuildingGetOneForAdminResponseDto })
	data: BuildingGetOneForAdminResponse
}

export class BuildingGetAllForAdminResDto extends CResponseDto<BuildingGetAllForAdminResponse> {
	@ApiProperty({ type: BuildingGetAllForAdminResponseDto })
	data: BuildingGetAllForAdminResponse
}
