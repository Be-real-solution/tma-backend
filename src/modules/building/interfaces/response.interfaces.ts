import { PaginationResponse } from '../../../interfaces'

export declare type BuildingGetAllResponse = PaginationResponse<BuildingGetOneResponse>

export declare interface BuildingGetOneResponse {
	id: string
	name: string
	address: string
	phoneNumber: string
	workStartTime: string
	workEndTime: string
	imageLink: string
	createdAt: Date
}
