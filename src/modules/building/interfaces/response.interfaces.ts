import { CreateInManyLangs, PaginationResponse } from '../../../interfaces'

export declare type BuildingGetAllResponse = PaginationResponse<BuildingGetOneResponse>

export declare interface BuildingImage {
	id: string
	imageLink: string
	createdAt: Date
}
export declare interface BuildingGetOneResponse {
	id: string
	name: string
	address: string
	description: string
	latitude: string
	longitude: string
	phoneNumber: string
	workStartTime: string
	workEndTime: string
	mainImage: string
	images: BuildingImage[]
	createdAt: Date
}

export declare type BuildingGetAllForAdminResponse = PaginationResponse<BuildingGetOneForAdminResponse>

export declare interface BuildingGetOneForAdminResponse {
	id: string
	name: CreateInManyLangs
	address: CreateInManyLangs
	description: CreateInManyLangs
	latitude: string
	longitude: string
	phoneNumber: string
	workStartTime: string
	workEndTime: string
	mainImage: string
	images: BuildingImage[]
	createdAt: Date
}
