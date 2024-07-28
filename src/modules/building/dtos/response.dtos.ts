import { PaginationResponseDto } from '../../../common'
import { BuildingGetAllResponse, BuildingGetOneResponse } from '../interfaces'

export class BuildingGetAllResponseDto extends PaginationResponseDto implements BuildingGetAllResponse {
	data: BuildingGetOneResponse[]
}

export class BuildingGetOneResponseDto implements BuildingGetOneResponse {
	id: string
	name: string
	address: string
	imageLink: string
	phoneNumber: string
	workEndTime: string
	workStartTime: string
	createdAt: Date
}
