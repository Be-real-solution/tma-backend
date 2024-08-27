import { CreateInManyLangs, PaginationResponse } from '../../../interfaces'

export declare type CategoryGetAllResponse = PaginationResponse<CategoryGetOneResponse>

export declare interface CategoryGetOneResponse {
	id: string
	name: string
	createdAt: Date
}

export declare type CategoryGetAllForAdminResponse = PaginationResponse<CategoryGetOneForAdminResponse>

export declare interface CategoryGetOneForAdminResponse {
	id: string
	name: CreateInManyLangs
	createdAt: Date
}
