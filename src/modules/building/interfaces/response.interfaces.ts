import { CreateInManyLangs, PaginationResponse } from '../../../interfaces'

export declare type BuildingGetAllResponse = PaginationResponse<BuildingGetOneResponse>

export declare interface BuildingGetOneResponse {
	id: string
	name: string
	address: string
	latitude: string
	longitude: string
	phoneNumber: string
	workStartTime: string
	workEndTime: string
	imageLink: string
	createdAt: Date
}

export declare type BuildingGetAllForAdminResponse = PaginationResponse<BuildingGetOneForAdminResponse>

export declare interface BuildingGetOneForAdminResponse {
	id: string
	name: CreateInManyLangs
	address: CreateInManyLangs
	latitude: string
	longitude: string
	phoneNumber: string
	workStartTime: string
	workEndTime: string
	imageLink: string
	createdAt: Date
}
