import { PaginationRequestDto } from '../../../common'
import { BuildingCreateRequest, BuildingDeleteRequest, BuildingGetAllRequest, BuildingGetOneByIdRequest, BuildingUpdateRequest } from '../interfaces'

export class BuildingGetAllRequestDto extends PaginationRequestDto implements BuildingGetAllRequest {
	name?: string
	address?: string
	phoneNumber?: string
	workEndTime?: string
	workStartTime?: string
}

export class BuildingGetOneByIdRequestDto implements BuildingGetOneByIdRequest {
	id: string
}

export class BuildingCreateRequestDto implements BuildingCreateRequest {
	name: string
	address: string
	imageLink: string
	phoneNumber: string
	workEndTime: string
	workStartTime: string
}

export class BuildingUpdateRequestDto implements BuildingUpdateRequest {
	name?: string
	address?: string
	imageLink?: string
	phoneNumber?: string
	workEndTime?: string
	workStartTime?: string
}

export class BuildingDeleteRequestDto implements BuildingDeleteRequest {
	id: string
}
