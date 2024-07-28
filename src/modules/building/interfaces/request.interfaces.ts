import { PaginationRequest } from '../../../interfaces'

export declare interface BuildingGetAllRequest extends PaginationRequest {
	name?: string
	address?: string
	phoneNumber?: string
	workStartTime?: string
	workEndTime?: string
}

export declare interface BuildingGetOneByIdRequest {
	id: string
}

export declare interface BuildingGetOneRequest {
	id?: string
	name?: string
	address?: string
	phoneNumber?: string
	workEndTime?: string
	workStartTime?: string
}

export declare interface BuildingCreateRequest {
	name: string
	address: string
	phoneNumber: string
	workEndTime: string
	workStartTime: string
	imageLink: string
}

export declare interface BuildingUpdateRequest {
	name?: string
	address?: string
	phoneNumber?: string
	workEndTime?: string
	workStartTime?: string
	imageLink?: string
}

export declare interface BuildingDeleteRequest {
	id: string
}
